import { useMutation, useQueryClient } from 'react-query'
import { notifyError, notifyInfo } from './useToas'
import axios, { AxiosError } from 'axios'
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
  const { mutateAsync: mutateAsyncWARequest, isLoading: isPendingWARequest } =
    useMutation({
      mutationFn: async ({ whatsapp_number }) => {
        try {
          await axios.post(apiURLQuery + API.WHATSAPP_REQUEST, {
            whatsapp_number,
          })
        } catch (e) {
          const message =
            e instanceof AxiosError
              ? e.response?.data?.message
              : 'Unknown Error Whatsapp Request'
          notifyError(message)
          throw e
        }
      },
    })

  return {
    mutateAsyncWARequest,
    isPendingWARequest,
  }
}
