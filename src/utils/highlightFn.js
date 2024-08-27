/**
 *
 * @param {string} message
 * @param {string} word
 * @param {boolean} isClicked
 * @returns {string}
 */
const highlightFn = (message, word, isClicked) => {
  const regex = new RegExp(`(${word})`, 'gi')
  return message?.replace(
    regex,
    `<span class="${
      isClicked
        ? 'bg-yellow-300 text-secondary-base group-hover:bg-secondary-base group-hover:text-white'
        : 'bg-secondary-base text-white'
    }">$1</span>`
  )
}

export { highlightFn }
