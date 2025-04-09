import { isBrowser } from '@antfu/utils'
import { isConnected } from './alias'

export const copyText = (() => {
  let textarea: HTMLTextAreaElement
  return (text: string) => {
    if (!isBrowser) { return }
    if (navigator.clipboard) {
      return navigator.clipboard
        .writeText(text)
        .then(() => true)
        .catch((e) => {
          throw e
        })
    }
    if (!document.execCommand) { return }
    if (!isConnected(textarea)) {
      textarea = document.createElement('textarea')
      document.appendChild(textarea)
    }
    textarea.value = text
    textarea.select()
    return document.execCommand('copy')
  }
})()
