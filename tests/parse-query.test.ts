import { describe, it } from 'mocha'
import { assert } from 'chai'
import { parseQuery } from '../lib/parsers'

describe('parseQuery()', () => {
  it('should add default parameters on empty params', () => {
    const query: string = parseQuery()
    const defaults: string[] = [
      'queryString=',
      't=games',
      'sorthead=popular',
      'sortd=0',
      'plat=',
      'length_type=main',
      'length_min=',
      'length_max=',
      'v=',
      'f=',
      'g=',
      'detail=',
      'randomize=0'
    ]
    assert.strictEqual(query, defaults.join('&'))
  })

  it('should add randomize=1 on boolean present', () => {
    const query: string = parseQuery({ randomize: true })
    const defaults: string[] = [
      'queryString=',
      't=games',
      'sorthead=popular',
      'sortd=0',
      'plat=',
      'length_type=main',
      'length_min=',
      'length_max=',
      'v=',
      'f=',
      'g=',
      'detail=',
      'randomize=1'
    ]
    assert.strictEqual(query, defaults.join('&'))
  })
})
