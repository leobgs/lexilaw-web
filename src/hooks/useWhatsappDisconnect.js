import axios, { AxiosError } from 'axios'
import { API } from 'config/api'
import { apiURLQuery } from 'config/app'
import { useMutation, useQueryClient } from 'react-query'
import { notifyError, notifyInfo } from './useToas'

/**
 *
 * @returns {{
 * isPendingWhatsappDisconnect: () => Promise<void>
 * mutateWhatsappDisconnect: Boolean
 * }}
 */
export const usePutWhatsappDisconnect = () => {
  const queryClient = useQueryClient()
  const {
    mutateAsync: mutateWhatsappDisconnect,
    isLoading: isPendingWhatsappDisconnect,
  } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.put(apiURLQuery + API.WHATSAPP_DISCONNECT)
        notifyInfo(data?.message || 'Sukses Diskonek WA')
        queryClient.invalidateQueries(['user'])
      } catch (e) {
        const message =
          e instanceof AxiosError
            ? e.response.data?.message
            : 'Error Whatsapp Diskonek'
        notifyError(message)
        throw e
      }
    },
  })

  return {
    mutateWhatsappDisconnect,
    isPendingWhatsappDisconnect,
  }
}
