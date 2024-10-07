import { useQuery } from 'react-query'
import { getData } from './useRequest'
import { API } from 'config/api'
import { useGetEncryptKey } from './useGetEncryptKey'
import { decryptAESGCM } from './useEncryptDecryption'

/**
 * @typedef {Object} IChatResponse
 * @property {number} code
 * @property {string} status
 * @property {string} message
 * @property {Data} data
 * @property {null} meta
 */

/**
 * @typedef {Object} Data
 * @property {Threadchat[] | null} thread_chat
 * @property {Lawyer[] | null} lawyer
 * @property {System[] | null} system
 */

/**
 * @typedef {Object} Lawyer
 * @property {string} uuid
 * @property {string} thread_uuid
 * @property {string} service_name_indonesia
 * @property {string} service_name_english
 * @property {string} url
 */

/**
 * @typedef {Object} Threadchat
 * @property {string} uuid
 * @property {string} thread_uuid
 * @property {string} [message]
 * @property {string} from
 * @property {string} from_display
 * @property {string} url
 */

/**
 * @typedef {Object} System
 * @property {string} thread_chat_uuid
 * @property {string} thread_uuid
 * @property {string} name
 */

/**
 *
 * @param {string} thread_uuid
 * @param {boolean} isEnabled
 * @returns {{
 * dataDocument: IChatResponse | undefined
 * isErrorDocument: boolean
 * isPendingDocument: boolean
 * errorDocument: Error
 * }}
 */
const useGetDocument = (thread_uuid, isEnabled) => {
  const { message } = useGetEncryptKey()

  const {
    data: dataDocument,
    isLoading: isPendingDocument,
    isError: isErrorDocument,
    error: errorDocument,
  } = useQuery({
    queryKey: ['chat_document', thread_uuid],
    queryFn: async () => {
      const data = await getData(API.CHAT_DOCUMENT + '/' + thread_uuid)
      const decryptedData = await decryptAESGCM(data.data, message)
      return {
        ...data,
        data: JSON.parse(decryptedData),
      }
    },
    enabled: Boolean(thread_uuid) && Boolean(message),
  })

  return {
    dataDocument,
    errorDocument,
    isErrorDocument,
    isPendingDocument,
  }
}

export { useGetDocument }
