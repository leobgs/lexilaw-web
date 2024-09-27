import { useMutation, useQueryClient } from 'react-query'
import { notifyError, notifyInfo } from './useToas'
import axios from 'axios'
import { apiURLQuery } from 'config/app'
import { API } from 'config/api'
import { useTranslation } from 'react-i18next'

/**
 *
 * @returns {{
 * mutateAsyncSaveDoc: (args: {thread_chat_id: string, thread_id: string, name: string}) => Promise<unknown>
 * mutateSaveDoc: (args: {thread_chat_id: string, thread_id: string, name: string}) => Promise<unknown>
 * isPendingSaveDoc: boolean
 * }}
 */
export const usePostSaveDocument = () => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const {
    mutateAsync: mutateAsyncSaveDoc,
    mutate: mutateSaveDoc,
    isLoading: isPendingSaveDoc,
  } = useMutation({
    mutationFn: async ({ thread_id, thread_chat_id, name }) => {
      try {
        const { data } = await axios.post(
          apiURLQuery + API.SAVE_CHAT_DOCUMENT,
          {
            thread_chat_id,
            thread_id,
            name,
          }
        )
        notifyInfo(t('chat.save_document.toast_success'))
        queryClient.invalidateQueries(['chat_document', thread_id])
        return data
      } catch (e) {
        if (e?.response.status === 400) {
          notifyInfo(t('chat.save_document.toast_success'))
        } else {
          const message = e instanceof Error ? e.message : 'Unknown Error'
          notifyError(message)
        }
      }
    },
  })

  return {
    mutateAsyncSaveDoc,
    mutateSaveDoc,
    isPendingSaveDoc,
  }
}
