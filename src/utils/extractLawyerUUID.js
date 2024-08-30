/**
 *
 * @param {Object} response
 * @returns {string | null}
 */
const extractLawyerUUID = (response) => {
  const pages = response?.pages
  if (Array.isArray(pages) && pages.length > 0) {
    const data = pages[0]?.data
    if (Array.isArray(data)) {
      for (const item of data) {
        if (item?.lawyer_uuid) {
          return item.lawyer_uuid
        }
      }
    }
  }
  return null
}

export { extractLawyerUUID }
