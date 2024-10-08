import { useMutation, useQueryClient } from 'react-query'
import { notifyError, notifyInfo } from './useToas'
import axios from 'axios'
import { apiURLQuery } from 'config/app'
import { API } from 'config/api'

/**
 *
 * @returns {{
 * mutateAsyncWARequest: ({whatsapp_number}:{whatsapp_number: string}) => Promise<void>
 * isPendingWARequest: boolean
 * }}
 */
export const usePostWhatsappRequest = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: mutateAsyncWARequest, isLoading: isPendingWARequest } =
    useMutation({
      mutationFn: async ({ whatsapp_number }) => {
        try {
          await axios.post(apiURLQuery + API.WHATSAPP_REQUEST, {
            whatsapp_number,
          })
        } catch (e) {
          const message =
            e instanceof Error ? e.message : 'Unknown Error Whatsapp Request'
          notifyError(message)
        }
      },
    })

  return {
    mutateAsyncWARequest,
    isPendingWARequest,
  }
}
