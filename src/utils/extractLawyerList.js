/**
 * @typedef {Object} ILawyer
 * @property {string} uuid
 * @property {string} city_name
 * @property {string} description
 * @property {number} experience
 * @property {string} first_name
 * @property {string} image_url
 * @property {string} last_name
 * @property {number} max_price
 * @property {number} min_price
 */

/**
 *
 * @param {Object} response
 * @returns {null | ILawyer[]}
 */
const extractLawyerList = (response) => {
  for (const item of response) {
    const message = item?.message
    if (
      message &&
      message.includes('Oke, silahkan cek kenalan Saya yang bisa bantu Kamu :')
    ) {
      // Cari string JSON yang merupakan daftar pengacara
      const start = message.indexOf('[')
      const end = message.lastIndexOf(']')
      if (start !== -1 && end !== -1) {
        const lawyerListString = message.substring(start, end + 1)
        try {
          const lawyerList = JSON.parse(lawyerListString)
          if (Array.isArray(lawyerList)) {
            return lawyerList
          }
        } catch (error) {
          console.error('Error parsing lawyer list JSON:', error)
        }
      }
    }
  }
  return null
}

export { extractLawyerList }
