export function toNumber<T>(value: any, defaultValue: T) {
  const num = Number.parseFloat(value)
  return Number.isNaN(num) ? defaultValue : num
}

export function toNumberOrNull(value: any) {
  return toNumber(value, null)
}

export function toNumberOrUndefined(value: any) {
  return toNumber(value, undefined)
}
