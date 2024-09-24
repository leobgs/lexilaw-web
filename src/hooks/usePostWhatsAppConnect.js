import { useMutation } from 'react-query'
import { getData } from './useRequest'
import { API } from 'config/api'

/**
 *
 * @returns {{
 * mutateAsyncWAConnect: (phoneNumber: string) => Promise<unknown>
 * isPendingWAConnect: boolean;
 * isErrorWAConnect: boolean
 * }}
 *
 */
export const usePostWhatsAppConnect = () => {
  const {
    mutateAsync: mutateAsyncWAConnect,
    isLoading: isPendingWAConnect,
    isError: isErrorWAConnect,
  } = useMutation({
    mutationFn: async (phoneNumber) => {
      await new Promise((r) => setTimeout(r, 1500))
      return getData(API.WHATSAPP_CONNECT, {
        whatsapp_number: phoneNumber,
      })
    },
  })

  return {
    mutateAsyncWAConnect,
    isPendingWAConnect,
    isErrorWAConnect,
  }
}
