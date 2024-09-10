import { useMutation, useQueryClient } from 'react-query'
import { getData } from './useRequest'
import { API } from 'config/api'

/**
 * Custom hook to get lawyer recommendations using React Query's useMutation.
 *
 * @typedef {Object} Config
 * @property {string} thread_uuid - The UUID of the chat thread.
 *
 */
const useGetLawyerRecommendation = (thread_uuid) => {
  const queryClient = useQueryClient()

  const {
    mutate: mutateGetLaywerRecommendation,
    isLoading: isPendingGetLawyerRecommendation,
    isError: isErrorGetLawyerRecommendation,
    error: errorGetLawyerRecommendation,
  } = useMutation({
    mutationFn: (config) => getData(API.CHAT_LAWYER_RECOMMENDATION, config),
    onSuccess: () => {
      queryClient.invalidateQueries('newest_thread')
      queryClient.invalidateQueries(['check_status', thread_uuid])
    },
  })

  return {
    mutateGetLaywerRecommendation,
    isPendingGetLawyerRecommendation,
    isErrorGetLawyerRecommendation,
    errorGetLawyerRecommendation,
  }
}

export { useGetLawyerRecommendation }
