import { isBrowser, noop } from '@antfu/utils'
import { withResolvers } from '../promise'

/**
 * Schedule a function to be called in a number of animation frames
 * @param callback The function to be called.
 * @param options An optional object with the following properties:
 * @param options.frames The number of frames to wait before executing the callback. Default is 1.
 * @param options.shouldCancel Optional function to determine if the scheduled callback should be cancelled.
 * @returns A function to cancel the scheduled animation frame.
 */
export function raf(callback: FrameRequestCallback, options: { frames?: number, shouldCancel?: () => boolean } = {}) {
  const { frames = 1, shouldCancel } = options
  return internalRaf(callback, frames, isBrowser ? (document.timeline?.currentTime as number) || 0 : 0, shouldCancel)
}

/**
 * wait specified animation frames
 */
export function waitFrames(frames = 1) {
  const { promise, resolve } = withResolvers<number>()
  raf(resolve, { frames })
  return promise
}

function internalRaf(
  callback: FrameRequestCallback,
  frames = 1,
  time: DOMHighResTimeStamp,
  shouldCancel?: () => any,
  notCompose?: boolean,
) {
  let localCanceled = false
  const finalShouldCancel = notCompose ? shouldCancel : () => localCanceled || shouldCancel?.()
  if (!frames || frames < 0) {
    !finalShouldCancel?.() && callback(time)
    return noop
  }
  const id = requestAnimationFrame((t) => {
    if (finalShouldCancel?.()) {
      return
    }
    internalRaf(callback, frames - 1, t, finalShouldCancel, true)
  })
  return () => {
    localCanceled = true
    cancelAnimationFrame(id)
  }
}

export function rafDebounce<T extends (...args: any[]) => any>(func: T, options: { frames?: number, shouldCancel?: () => boolean } = {}) {
  const { frames = 1, shouldCancel } = options
  let queuedCallback: T | null
  if (frames < 0 || !frames) {
    return func
  }
  return function (this: ThisType<T>, ...args: any[]) {
    if (!queuedCallback) {
      raf(
        () => {
          queuedCallback!.apply(this, args)
          queuedCallback = null
        },
        {
          frames,
          shouldCancel,
        },
      )
    }
    queuedCallback = func
  } as T
}
