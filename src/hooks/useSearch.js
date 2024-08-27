import { API } from 'config/api'
import { getData } from 'hooks/useRequest'
import { useQuery } from 'react-query'

/**
 * @typedef {Object} IThreadChat
 * @property {string} uuid
 * @property {string} thread_uuid
 * @property {string} message
 * @property {string} from
 * @property {string} from_display
 */

/**
 * @typedef {Object} IDocument
 * @property {string} uuid
 * @property {string} thread_uuid
 * @property {string} message
 * @property {string} from
 * @property {string} from_display
 * @property {string} filename
 * @property {string} file_url
 */

/**
 * @typedef {Object} IThread
 * @property {string} uuid
 * @property {string} title
 */

/**
 * @typedef {Object} Meta
 * @property {number} page
 * @property {number} limit
 * @property {number} total
 */

/**
 * @typedef {Object} Data
 * @property {null | IThreadChat[]} thread_chat
 * @property {null | IDocument[]} document
 * @property {null | IThread[]} thread
 */

/**
 * @typedef {Object} ISearchDataResponse
 * @property {number} code
 * @property {string} status
 * @property {string} message
 * @property {Data} data
 * @property {Meta} meta
 */

/**
 *
 * @param {string} query - The search query string.
 * @param {boolean} isModal - is in modal
 * @returns {{
 *   searchData: ISearchDataResponse | undefined,
 *   isPendingSearch: boolean,
 * }}
 */
const useSearch = (query, isModal) => {
  const { data: searchData, isLoading: isPendingSearch } = useQuery({
    queryKey: ['search', query, isModal && 'modal'],
    queryFn: () => getData(API.SEARCH + '?query=' + query + '&limit=10'),
    enabled: Boolean(query),
  })

  return {
    searchData,
    isPendingSearch,
  }
}

export { useSearch }
