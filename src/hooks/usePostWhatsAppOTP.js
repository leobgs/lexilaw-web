import { useMutation } from 'react-query'
import { getData } from './useRequest'
import { API } from 'config/api'
import axios from 'axios'
import { apiURLQuery } from 'config/app'

/**
 *
 * @returns {{
 * mutateAsyncWAOTP: (otp: string) => Promise<unknown>
 * isPendingWAOTP: boolean
 * isErrorWAOTP: boolean
 * }}
 */
export const usePostWhatsAppOTP = () => {
  const {
    mutateAsync: mutateAsyncWAOTP,
    isError: isErrorWAOTP,
    isLoading: isPendingWAOTP,
  } = useMutation({
    mutationFn: async (otp) => {
      try {
        const { data } = await axios.post( apiURLQuery + API.WHATSAPP_OTP, {
          otp,
        })

        return data
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown Error'
        console.log(message)
        throw e
      }
    },
  })

  return {
    mutateAsyncWAOTP,
    isPendingWAOTP,
    isErrorWAOTP,
  }
}
