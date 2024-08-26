/**
 *
 * @param {string} args
 * @returns {string}
 */
const cleanMessage = (args) => {
  return args.replace(/^###\s+/gm, '').replace(/[*_`~]/g, '')
}

export { cleanMessage }
