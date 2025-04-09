import { describe, expect, it } from 'vitest'
import { copyText } from './text'

describe('browser/text', () => {
  it('copyText', async () => {
    const result = await copyText('test')
    expect(result).toBe(true)
  })
})
