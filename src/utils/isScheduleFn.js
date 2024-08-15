/**
 * digunakan untuk meng-extract UUID dari
 * `META-SCHEDULE`
 *
 * @param {string} str
 *
 * @returns {Array | null | string}
 */
const isScheduleFn = (str) => {
  const regex = /###META-SCHEDULE:([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/
  const match = str.match(regex)

  if (match) {
    return match[1]
  }

  return null
}

export { isScheduleFn }
