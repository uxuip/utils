import { expect, it } from 'vitest'
import { toFixedFloat } from './math'

it('toFixedFloat', () => {
  expect(toFixedFloat(1.00, 2)).toBe(1)
  expect(toFixedFloat(1.10, 2)).toBe(1.1)
  expect(toFixedFloat(1.23456789, 2)).toBe(1.23)
  expect(toFixedFloat(1.23456789, 0)).toBe(1)
})
