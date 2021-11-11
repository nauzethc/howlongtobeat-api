import { describe, it } from 'mocha'
import { expect } from 'chai'
import { readFileSync } from 'fs'
import { GameDetail } from '../lib/types'
import { parseGameDetail } from '../lib/parsers'

const DETAIL_BAYONETTA_PATH = 'tests/resources/detail_bayonetta.html'
const DETAIL_ELDENRING_PATH = 'tests/resources/detail_elden_ring.html'

describe('parseGameDetail()', () => {
  describe('"Bayonetta" (966) detail data', () => {
    const html: string = readFileSync(DETAIL_BAYONETTA_PATH).toString()
    const game: GameDetail = parseGameDetail(html)

    it('should parse detail "id" and "name"', () => {
      expect(game.id).to.be.equal(966)
      expect(game.name).to.be.equal('Bayonetta')
    })
    it('should parse metadata', () => {
      expect(game.platforms).to.be.an('array')
      expect(game.platforms).to.include.members(['Nintendo Switch'])
      expect(game.genres).to.be.an('array')
      expect(game.genres).to.have.members(['Hack and Slash', 'Action'])
      expect(game.developers).to.have.members(['PlatinumGames'])
    })
    it('should parse times from "Single-Player" table', () => {
      expect(game.gameplays.single).to.be.an('array')
      expect(game.gameplays).to.have.nested.property('single[0].average')
      expect(game.gameplays)
        .to.have.nested.property('single[0].type')
        .is.equal('Main Story')
    })
    it('should parse times from "Platforms" table', () => {
      expect(game.gameplays.platforms).to.be.an('array')
      expect(game.gameplays)
        .to.have.nested.property('platforms[7].platform')
        .and.is.equal('Xbox 360')
      expect(game.gameplays)
        .to.have.nested.property('platforms[1].extended')
        .and.is.equal('16h 42m')
    })
  })

  describe('"Elden Ring" (68151) unreleased game detail data', () => {
    const html: string = readFileSync(DETAIL_ELDENRING_PATH).toString()
    const game: GameDetail = parseGameDetail(html)

    it('should parse detail "id" and "name"', () => {
      expect(game.id).to.be.equal(68151)
      expect(game.name).to.be.equal('Elden Ring')
    })
    it('should parse metadata', () => {
      expect(game.platforms).to.be.an('array')
      expect(game.platforms).to.include.members(['PlayStation 5'])
      expect(game.genres).to.be.an('array')
      expect(game.genres).to.include.members(['Third-Person', 'Action'])
      expect(game.developers).to.have.members(['From Software'])
    })
    it('should not parse times from "Single-Player" table', () => {
      expect(game.gameplays.single).to.be.undefined
    })
    it('should not parse times from "Platforms" table', () => {
      expect(game.gameplays.single).to.be.undefined
    })
  })

  describe('empty html data', () => {
    it('should throw error', () => {
      try {
        const game: GameDetail = parseGameDetail('')
      } catch (err) {
        expect(err).to.be.an('error')
      }
    })
  })
})
