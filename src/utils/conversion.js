/**
 * thanks for Fabian Schultz, Brynner Ferreira
 * @url https://stackoverflow.com/questions/40885923/countdown-timer-in-react
 *
 * @param   {[BigInteger]}  secs  [secs description]
 *
 * @return  {[Object]}        [return description]
 */
export const secondsToTime = (secs) => {
  const hours = Math.floor(secs / (60 * 60))

  const divisor_for_minutes = secs % (60 * 60)
  const minutes = Math.floor(divisor_for_minutes / 60)

  const divisor_for_seconds = divisor_for_minutes % 60
  const seconds = Math.ceil(divisor_for_seconds)

  return {
    h: hours,
    m: minutes,
    s: seconds,
  }
}

export const padWithZeroes = (number, length = 1) => {
  let string = '' + number

  while (string.length < length) {
    string = '0' + string
  }

  return string
}

/**
 * thanks
 * @url https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
 */
export const separator = (x, sp = '.') =>
  x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, sp)

export function formatPrice(amount, ratePerSymbol, rateSymbol = '') {
  const symbolCount = Math.max(1, Math.floor(amount / ratePerSymbol))
  const maxSymbols = 25

  if (symbolCount > maxSymbols) {
    const remainingSymbols = symbolCount - maxSymbols
    return `${rateSymbol.repeat(maxSymbols)}(${remainingSymbols}+)`
  }
  return `${rateSymbol?.repeat(symbolCount)}`
}
