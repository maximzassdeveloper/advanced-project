const TRILLION = 1_000_000_000_000
const BILLION = 1_000_000_000
const MILLION = 1_000_000
const THOUSAND = 1_000

export const cutNumber = (origNum: number): string => {
  const num = Math.abs(Math.trunc(origNum))
  let result = num.toString()

  if (num >= TRILLION) {
    result = '999B+'
  } else if (num >= BILLION) {
    result = Math.floor(num / BILLION) + 'B'
  } else if (num >= MILLION) {
    result = Math.floor(num / MILLION) + 'M'
  } else if (num >= THOUSAND) {
    result = Math.floor(num / THOUSAND) + 'k'
  }

  return result
}
