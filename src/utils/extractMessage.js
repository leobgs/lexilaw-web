/**
 * 
 * @param {string} message 
 * @param {string} keyword 
 * @param {number} contextLength 
 * @returns 
 */
const extractMessage = (message, keyword, contextLength = 15) => {
  const keywordIndex = message.toLowerCase().indexOf(keyword.toLowerCase())

  if (keywordIndex === -1) {
    return keyword
  }

  const start = Math.max(0, keywordIndex - contextLength)
  const end = Math.min(message.length, keywordIndex + keyword.length + contextLength)

  return message.substring(start, end).trim()
}

export { extractMessage }
