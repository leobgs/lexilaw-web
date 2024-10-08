/**
 * digunakan untuk mensanitasi / menghilangkan beberapa meta data seperti:
 *
 * `consult = yes`
 *
 * `### META-LAWYER-HELP`
 *
 * `### META-CONTENT`
 *
 * `####META-SUMMARY`
 *
 * @param {string} arg
 *
 * @returns {string}
 */
export const cleanTextFn = (arg) => {
  const patterns = [
    /###\s*META-CONTENT:\s*.*?(\r?\n|$)/gi,
    /consult\s*=\s*true/gi,
    /###\s*META-LAWYER-HELP:\s*.*?(\r?\n|$)/gi,
    /【[^】]+】/g,
    /###META-SCHEDULE:([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/,
    /####META-SUMMARY:\s*.*?(\r?\n|$)/gi,
    /###META-SUMMARY:\s*.*?(\r?\n|$)/gi,
  ]

  let cleanedText = arg

  patterns.forEach((pattern) => {
    cleanedText = cleanedText.replace(pattern, '')
  })

  return cleanedText.trim()
}
