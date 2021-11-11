import { describe, it } from 'mocha'
import { expect } from 'chai'
import { readFileSync } from 'fs'
import { GameResult } from '../lib/types'
import { parseGameResults } from '../lib/parsers'

const RESULTS_METROID_PATH = 'tests/resources/search_results_metroid.html'
const RESULTS_HALO_PATH = 'tests/resources/search_results_halo.html'
const RESULTS_BAYONETTA_PATH = 'tests/resources/search_results_bayonetta.html'
const RESULTS_NONE_PATH = 'tests/resources/search_results_none.html'

interface Results {
  total: number
  data: GameResult[]
}

describe('parseGameResults()', () => {
  describe('"metroid" search data', () => {
    const html: string = readFileSync(RESULTS_METROID_PATH).toString()
    const results: Results = parseGameResults(html)

    it('should parse results', () => {
      expect(results.total).to.be.equal(32)
      expect(results.data).to.be.an('array')
      expect(results.data.length).to.be.equal(20)
    })
    it('second result should be "Metroid Dread"', () => {
      const result: GameResult = results.data[1]
      expect(result.name).to.be.equal('Metroid Dread')
      expect(result.id).to.be.equal(94075)
      expect(result.gameplayMain).to.be.equal(8.5)
    })
  })

  describe('"halo" search data', () => {
    const html: string = readFileSync(RESULTS_HALO_PATH).toString()
    const results: Results = parseGameResults(html)

    it('should parse results', () => {
      expect(results.total).to.be.equal(26)
      expect(results.data).to.be.an('array')
      expect(results.data.length).to.be.equal(20)
    })
    it('first result should be "Halo: The Master Chief Collection" with valid hours', () => {
      const result: GameResult = results.data[0]
      expect(result.name).to.be.equal('Halo: The Master Chief Collection')
      expect(result.gameplayMain).to.be.equal(55.5)
    })
  })

  describe('"bayonetta" search data', () => {
    const html: string = readFileSync(RESULTS_BAYONETTA_PATH).toString()
    const results: Results = parseGameResults(html)

    it('should parse results', () => {
      expect(results.total).to.be.equal(5)
      expect(results.data).to.be.an('array')
      expect(results.data.length).to.be.equal(5)
    })
    it('third result should be "Bayonetta 3" (unreleased) with empty values', () => {
      const result: GameResult = results.data[2]
      expect(result.name).to.be.equal('Bayonetta 3')
      expect(result).to.not.have.property('gameplayMain')
      expect(result).to.not.have.property('gameplayExtended')
      expect(result).to.not.have.property('gameplayCompletionist')
    })
    it('last result should have "gameplayMain" parsed', () => {
      const result: GameResult = results.data[results.data.length - 1]
      expect(result.gameplayMain).to.be.equal(16.5)
    })
  })

  describe('empty search', () => {
    it('should return 0 results on empty HTML', () => {
      const results: Results = parseGameResults('')
      expect(results.total).to.be.equal(0)
      expect(results.data).to.be.an('array')
      expect(results.data.length).to.be.equal(0)
    })

    it('should return 0 results on not found pattern', () => {
      const html: string = readFileSync(RESULTS_NONE_PATH).toString()
      const results: Results = parseGameResults(html)
      expect(results.total).to.be.equal(0)
      expect(results.data).to.be.an('array')
      expect(results.data.length).to.be.equal(0)
    })
  })
})
