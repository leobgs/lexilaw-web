/**
 * digunakan untuk mensanitasi / menghilangkan beberapa meta data seperti:
 *
 * `consult = yes`
 * 
 * `### META-LAWYER-HELP`
 * 
 * `### META-CONTENT`
 *
 * @param {string} arg
 *
 * @returns {string}
 */
export const cleanTextFn = (arg) => {
  const patterns = [
    /###\s*META-CONTENT:\s*.*?(\r?\n|$)/gi,
    /consult\s*=\s*true/gi,
    /###\s*META-LAWYER-HELP:\s*yes/gi,
    /【[^】]+】/g,
  ]

  let cleanedText = arg

  patterns.forEach((pattern) => {
    cleanedText = cleanedText.replace(pattern, '')
  })

  return cleanedText.trim()
}
