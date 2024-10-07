import { useMutation, useQueryClient } from 'react-query'
import { notifyError, notifyInfo } from './useToas'
import axios from 'axios'
import { API } from 'config/api'
import { apiURLQuery } from 'config/app'
import { useTranslation } from 'react-i18next'

/**
 *
 * @returns {{
 * mutateAsyncDeleteDocument: ({thread_id: string, thread_chat_id: string}) => Promise<void>
 * isPendingDeleteDocument: boolean
 * }}
 */
export const useDeleteDocument = () => {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  const {
    mutateAsync: mutateAsyncDeleteDocument,
    isLoading: isPendingDeleteDocument,
  } = useMutation({
    mutationFn: async (body) => {
      console.log(body)
      try {
        await axios.delete(apiURLQuery + API.SAVE_CHAT_DOCUMENT, {
          data: body,
        })
        notifyInfo(t('system_document.delete_success_message'))
        queryClient.invalidateQueries(['chat_document', body?.thread_id])
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Unknown Error'
        notifyError(message)
      }
    },
  })

  return {
    mutateAsyncDeleteDocument,
    isPendingDeleteDocument,
  }
}
