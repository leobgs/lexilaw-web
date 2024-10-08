import { useQuery } from 'react-query'
import { notifyError } from './useToas'
import axios from 'axios'
import { apiURLQuery } from 'config/app'
import { API } from 'config/api'

/**
 * @typedef {Object} WhatsappTutorialResponse
 * @property {number} code
 * @property {string} status
 * @property {string} message
 * @property {Data} data
 * @property {object} meta
 */
/**
 * @typedef {Object} Data
 * @property {string} whatsapp_contact
 * @property {Steps[]} steps
 */
/**
 * @typedef {Object} Steps
 * @property {string} uuid
 * @property {number} order
 * @property {string} image_url
 * @property {string} description_indonesia
 * @property {string} description_english
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 *
 * @returns {{
 * dataWATutorial: undefined | WhatsappTutorialResponse
 * isPendingWATutorial: boolean
 * }}
 */
export const useGetWhatsappTuorial = () => {
  const { data: dataWATutorial, isLoading: isPendingWATutorial } = useQuery({
    queryKey: ['whatsapp_tutorial'],
    queryFn: async () => {
      try {
        const { data } = await axios.get(apiURLQuery + API.WHATSAPP_TUTORIAL)
        return data
      } catch (e) {
        const message =
          e instanceof Error ? e.message : 'Unknown Error Whatsapp Tutorial'
        notifyError(message)
      }
    },
  })

  return {
    dataWATutorial,
    isPendingWATutorial,
  }
}
