import cheerio from 'cheerio'
import { BASE_URL } from './howlongtobeat.json'
import {
  SINGLE_PLAYER_FIELDS,
  RELATED_CONTENT_FIELDS,
  MULTI_PLAYER_FIELDS,
  SPEEDRUN_FIELDS,
  PLATFORM_FIELDS,
  GameDetail,
  GameResult,
  LengthType,
  Query,
  SortBy,
  SortOrder,
  Perspective,
  Flow,
  Genre,
  Modifier,
  Platform
} from './types'

/*
 * Regular expresions to extract relative times on searching
 */
const REGEX = {
  TOTAL_FOUND: /We Found (?<total>\d+) Games/i,
  GAMEPLAY_MAIN: /(MainStory|Solo)(?<hours>\d+½?Hours)?(?<mins>\d+Mins)?/i,
  GAMEPLAY_EXTENDED: /(Main\+Extra)(?<hours>\d+½?Hours)?(?<mins>\d+Mins)?/i,
  GAMEPLAY_COMPLETIONIST: /(Completionist)(?<hours>\d+½?Hours)?(?<mins>\d+Mins)?/i,
  GAMEPLAY_MULTI: /(Vs\.)(?<hours>\d+½?Hours)?(?<mins>\d+Mins)?/i
}

function parseTotalResults (regex: RegExp, s: string): number {
  const found = regex.exec(s)
  return parseInt((found && found.pop()) || '0')
}

function parseRelativeTimes (regex: RegExp, s: string): number {
  // Clean string and execute regular expresion
  const found = regex.exec(s.replace(/(\s|\t|\n)+/g, '')) as any

  // Extract matched groups
  const { hours, mins } = (found && found['groups']) || {}

  // Parse results and return
  return (
    parseFloat(
      (hours && hours.replace('Hours', '').replace('½', '.5')) || '0'
    ) +
    parseInt((mins && mins.replace('Mins', '')) || '0') / 60.0
  )
}

function parseTableTimes (table: string, rows: Array<string[]>): any {
  let name: string = 'unknown'
  let fields: string[] = []
  let values: any[] = []

  // Set field names by table name
  switch (table) {
    case 'Single-Player':
      name = 'single'
      fields = SINGLE_PLAYER_FIELDS
      break
    case 'Multi-Player':
      name = 'multi'
      fields = MULTI_PLAYER_FIELDS
      break
    case 'Additional Content':
      name = 'dlc'
      fields = RELATED_CONTENT_FIELDS
      break
    case 'Main Game':
      name = 'mainGame'
      fields = RELATED_CONTENT_FIELDS
      break
    case 'Speedrun':
      name = 'speedrun'
      fields = SPEEDRUN_FIELDS
      break
    case 'Platform':
      name = 'platforms'
      fields = PLATFORM_FIELDS
      break
  }

  // Iterate over values
  rows.forEach(row => {
    const gameplay: any = {}
    fields.forEach((field, index) => {
      if (row[index] !== '--') gameplay[field] = row[index]
    })
    values.push(gameplay)
  })
  return { [name]: values }
}

export function parseQuery (query: Query): string {
  const params = new URLSearchParams()
  params.append('queryString', query.search || '')
  params.append('t', 'games')
  params.append('sorthead', query.sortBy || SortBy.MostPopular)
  params.append('sortd', `${query.sortOrder || SortOrder.Descending}`)
  params.append('plat', query.platform || Platform.All)
  params.append('length_type', query.lengthType || LengthType.Main)
  params.append('length_min', query.lengthMin || '')
  params.append('length_max', query.lengthMax || '')
  params.append('v', query.perspective || Perspective.All)
  params.append('f', query.flow || Flow.All)
  params.append('g', query.genre || Genre.All)
  params.append('detail', query.modifier || Modifier.None)
  params.append('randomize', query.randomize ? '1' : '0')
  return params.toString()
}

export function parseGameResults (
  html: string
): { total: number; data: GameResult[] } {
  const data: GameResult[] = []
  let total: number = 0
  const $ = cheerio.load(html)

  // Check if any results found
  if ($('.global_padding > h3').text()) {
    // Get total data for pagination
    total = parseTotalResults(
      REGEX.TOTAL_FOUND,
      $('.global_padding > h3').text()
    )

    // Iterate over results
    $('ul li').each(function () {
      const id: number = parseInt(
        $(this)
          .find('.search_list_details h3 a')
          .first()
          .attr()
          .href.split('=')
          .pop() || '0'
      )
      const name: string = $(this)
        .find('.search_list_details h3 a')
        .text()
        .trim()
      const imageUrl: string = $(this)
        .find('.search_list_image img')
        .first()
        .attr().src

      const times = $(this)
        .find('.search_list_details')
        .text()

      // Extract times with regular expressions
      const gameplays: Array<[string, number]> = [
        ['gameplayMain', parseRelativeTimes(REGEX.GAMEPLAY_MAIN, times)],
        [
          'gameplayExtended',
          parseRelativeTimes(REGEX.GAMEPLAY_EXTENDED, times)
        ],
        [
          'gameplayCompletionist',
          parseRelativeTimes(REGEX.GAMEPLAY_COMPLETIONIST, times)
        ],
        ['gameplayMulti', parseRelativeTimes(REGEX.GAMEPLAY_MULTI, times)]
      ]

      // Filter empty gameplays
      const filtered: any = {}
      gameplays.filter(([k, v]) => v).forEach(([k, v]) => (filtered[k] = v))

      // Save result
      data.push({
        id,
        name,
        imageUrl: imageUrl ? `${BASE_URL}${imageUrl}` : '',
        ...filtered
      })
    })
  }
  return { total, data }
}

export function parseGameDetail (html: string): GameDetail {
  const $ = cheerio.load(html)
  const $main = $('#global_site > .contain_out.back_blue')
  const $metadata = $('#global_site .profile_info')
  const $tables = $('#global_site table')

  // Basic required data
  const id: number = parseInt(
    $main
      .find('.profile_nav ul li a')
      .first()
      .attr()
      .href.split('=')
      .pop() || '0'
  )
  const name: string = $main
    .find('.profile_header_game > .profile_header')
    .text()
    .trim()
  const description: string = $metadata
    .first()
    .text()
    .replace('...Read More', '')
    .trim()
  const imageUrl: string = $main.find('.game_image img').attr().src

  // Stats
  const stats: any = {}
  $main.find('.profile_header_game > .profile_details ul li').each(function () {
    const [value, name] = $(this)
      .text()
      .trim()
      .split(' ')
    if (name === 'Retired' || name === 'Rating') {
      stats[name.toLowerCase()] = parseInt(value.replace('%', '') || '0') / 100
    } else {
      stats[name.toLowerCase()] = value
    }
  })

  // Optional metadata
  const metadata: any = {}
  const releaseDates: any = {}
  $metadata.each(function () {
    const key: string = $(this)
      .find('strong')
      .text()
      .trim()
    const value: string = (
      $(this)
        .text()
        .split(key)
        .pop() || ''
    ).trim()

    switch (key) {
      case 'Platforms:':
        metadata.platforms = value.split(', ')
        break
      case 'Genres:':
        metadata.genres = value.split(', ')
        break
      case 'Developers:':
        metadata.developers = value.split(', ')
        break
      case 'Publishers:':
        metadata.publisher = value
        break
      case 'NA:':
      case 'EU:':
      case 'JP:':
        releaseDates[key.replace(':', '')] = value
        break
    }
  })

  // Parse time tables
  const gameplays = {}
  $tables.each(function () {
    // Get table name
    const tableName: string = $(this)
      .find('thead tr td')
      .first()
      .text()
      .trim()
    const rows: Array<string[]> = []

    // Iterate over rows
    $(this)
      .find('tbody tr')
      .each(function () {
        const row: string[] = []
        // Iterate over cells
        $(this)
          .find('td')
          .each(function () {
            row.push(
              $(this)
                .text()
                .trim()
            )
          })
        rows.push(row)
      })

    // Transform arrays to object with named fields
    Object.assign(gameplays, parseTableTimes(tableName, rows))
  })

  return {
    id,
    name,
    description,
    imageUrl: imageUrl ? `${BASE_URL}${imageUrl}` : '',
    stats,
    ...metadata,
    releaseDates,
    gameplays
  }
}
