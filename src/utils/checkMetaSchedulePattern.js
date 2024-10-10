/**
 * Memeriksa apakah ada string dalam array yang cocok dengan pola META-SCHEDULE tertentu.
 *
 * digunakan untuk men-disable `LawyerCardRecommendation` dan `ButtonVariant`
 *
 * @param {{message: string}[] | null} arr -
 * @returns {boolean}
 */
export const checkMetaSchedulePattern = (arr) => {
  if (!arr) {
    return false
  }

  const pattern =
    /^###META-SCHEDULE:[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

  return arr.some((str) => pattern.test(str.message))
}
