/**
 * Fn yang digunakan untuk mentransform
 *
 * `---`
 *
 * menjadi
 *
 * `<code>`
 *
 * @param {string} responseText
 * @returns {{
 * responseText: string
 * copiedText: string
 * }}
 */
export const transformMarkdown = (responseText) => {
  const regex = /^---\n([\s\S]*?)\n---$/m
  const match = responseText.match(regex)
  let copiedText = ''

  if (match) {
    const transformText = responseText.replace(regex, (_, p1) => {
      copiedText = p1.trim().replace(/\*\*(.*?)\*\*/g, '$1')
      return '<mydiv>\n' + p1.trim() + '\n</mydiv>'
    })

    return { copiedText, responseText: transformText }
  } else {
    return { responseText, copiedText }
  }
}
