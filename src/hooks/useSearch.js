import { API } from 'config/api'
import { getData } from 'hooks/useRequest'
import { useQuery } from 'react-query'

/**
* @typedef {Object} SearchResponse
* @property {number} code
* @property {string} status
* @property {string} message
* @property {Data[] | null} data
* @property {Meta} meta
*/
/**
* @typedef {Object} Data
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
 *
 * @param {string} query - The search query string.
 * @param {boolean} isModal - is in modal
 * @returns {{
 *   searchData: SearchResponse | undefined,
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

