import { createControlledPromise } from '@antfu/utils'
import { makeDestructurable } from './function'

/**
 * @example
 * ```
 * const { promise, resolve, reject } = withResolvers<number>()
 * ```
 * @example
 * ```
 * const [ promise, resolve, reject ] = withResolvers<number>()
 * ```
 */
export function withResolvers<T = void>() {
  let promiseWithResolvers: PromiseWithResolvers<T>

  if (Promise.withResolvers) {
    promiseWithResolvers = Promise.withResolvers()
  }
  else {
    const controlledPromise = createControlledPromise<T>()
    promiseWithResolvers = {
      promise: controlledPromise,
      resolve: controlledPromise.resolve,
      reject: controlledPromise.reject,
    }
  }

  return makeDestructurable(promiseWithResolvers, [promiseWithResolvers.promise, promiseWithResolvers.resolve, promiseWithResolvers.reject] as const)
}
