/**
 * Fn digunakan untuk mengecek apakah input mengandung pola
 *
 * `consult = yes`
 * atau
 * `### META-LAWYER-HELP`
 *
 * @param {string} input
 *
 * @returns {boolean}
 */
export const isConsultFn = (input) => {
  const consultPattern = /(consult\s*=\s*true|###\s*META-LAWYER-HELP:\s*yes)/gi

  return consultPattern.test(input)
}
