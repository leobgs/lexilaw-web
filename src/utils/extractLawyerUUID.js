/**
 *
 * @param {Object} response
 * @returns {string | null}
 */
const extractLawyerUUID = (response) => {
  if (response) {
    for (const item of response) {
      if (item?.lawyer_uuid) {
        return item.lawyer_uuid
      }
    }
  }
  return null
}

export { extractLawyerUUID }
