/**
 * Fn yang digunakan untuk mentransform
 *
 * `---` menjadi `<code>`
 * dan
 * `###doc-start` menjadi `<mydiv>`
 * `###doc-end` menjadi `</mydiv>`
 *
 * @param {string} responseText
 * @returns {{
 * responseText: string
 * copiedText: string
 * }}
 */
export const transformMarkdown = (responseText) => {
  const codeBlockRegex = /^---\n([\s\S]*?)\n---$/m
  const docBlockRegex = /###doc-start\n([\s\S]*?)###doc-end/m
  let copiedText = ''

  // Transform code blocks
  if (codeBlockRegex.test(responseText)) {
    responseText = responseText.replace(codeBlockRegex, (_, p1) => {
      copiedText = p1.trim().replace(/\*\*(.*?)\*\*/g, '$1')
      return '<mydiv>\n' + p1.trim() + '\n</mydiv>'
    })
  }

  // Transform doc blocks
  if (docBlockRegex.test(responseText)) {
    responseText = responseText.replace(docBlockRegex, (_, p1) => {
      // If copiedText is empty, use the content from doc block
      if (!copiedText) {
        copiedText = p1.trim().replace(/\*\*(.*?)\*\*/g, '$1')
      }
      return '<mydiv>\n' + p1.trim() + '\n</mydiv>'
    })
  }

  return { responseText, copiedText }
}
