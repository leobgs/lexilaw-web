/**
 * @typedef {Object} IThreadChat
 * @property {string} uuid
 * @property {string} thread_uuid
 * @property {string} message
 * @property {string} from
 * @property {string} from_display
 */

/**
 * Filters out thread chat messages yang kosong atau empty string
 *
 * @param {IThreadChat[] | null} threadChats
 * @returns {IThreadChat[] | null}
 */
const filterThreadChats = (threadChats) => {
  if (!threadChats) {
    return null
  }
  return threadChats.filter((item) => item.thread_uuid)
}

export { filterThreadChats }
