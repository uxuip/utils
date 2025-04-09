import { expect, it } from 'vitest'
import { withResolvers } from './promise'

it('withResolvers array', async () => {
  const [promise1, resolve] = withResolvers<number>()
  resolve(1)
  expect(await promise1).toBe(1)

  const [promise2, _, reject] = withResolvers<number>()
  reject()
  await expect(promise2).rejects.toThrow()
})

it('withResolvers object', async () => {
  const { promise: promise1, resolve } = withResolvers<number>()
  resolve(1)
  expect(await promise1).toBe(1)

  const { promise: promise2, reject } = withResolvers<number>()
  reject()
  await expect(promise2).rejects.toThrow()
})
