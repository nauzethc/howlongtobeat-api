import { Query, GameResult, GameDetail } from './types'
import { parseGameDetail, parseGameResults, parseQuery } from './parsers'
import axios from 'axios'
import config from './howlongtobeat.json'

export async function find (
  query: Query
): Promise<{ total: number; data: GameResult[] }> {
  return axios({
    method: 'POST',
    baseURL: config.BASE_URL,
    url: config.SEARCH_ENDPOINT,
    data: parseQuery(query),
    params: { page: query.page || 1 },
    timeout: 20000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformResponse: parseGameResults
  }).then(res => res.data)
}

export async function get (id: number): Promise<GameDetail | null> {
  return axios({
    method: 'GET',
    baseURL: config.BASE_URL,
    url: config.DETAIL_ENDPOINT,
    params: { id },
    timeout: 20000,
    transformResponse: parseGameDetail
  })
    .then(res => res.data)
    .catch(err => null)
}

export default { find, get }
