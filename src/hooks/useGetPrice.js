import { useQuery } from 'react-query'
import { getData } from './useRequest'
import { API } from 'config/api'

export const useGetPrice = () => {
  const { data: rateData } = useQuery(
    ['lawyer-price'],
    () => getData(API.PRICE_SYMBOL),
    {}
  )

  const resultData = rateData?.data

  return { resultData }
}
