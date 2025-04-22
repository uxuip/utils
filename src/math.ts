/**
 * Converts number to number with specified digits after decimal point
 * @param num - number to be converted
 * @param digits - number of digits after decimal point
 * @returns number with specified digits after decimal point
 * @example
 * ```ts
 * toFixed(1.00, 2) // 1
 * toFixed(1.10, 2) // 1.1
 * toFixed(1.23456789, 2) // 1.23
 * toFixed(1.23456789, 0) // 1
 * ```
 */
export function toFixedFloat(num: number, digits: number): number {
  return Number.parseFloat(num.toFixed(digits))
}
