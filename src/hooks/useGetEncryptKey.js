import { useQuery } from 'react-query'
import { getData } from './useRequest'
import { API } from 'config/api'

export const useGetEncryptKey = () => {
  const { data, refetch } = useQuery(
    ['encrypt-key'],
    () => getData(API.ENCRYPT_KEY),
    {}
  )

  function decodeMessage(encoded = '') {
    let message = ''
    let index = 0

    while (index < encoded?.length) {
      // Extract the single-digit number (key)
      if (
        index >= encoded?.length ||
        encoded[index] < '1' ||
        encoded[index] > '9'
      ) {
        break
      }

      const keyStr = encoded[index]
      const key = parseInt(keyStr, 10)
      if (isNaN(key)) {
        console.error('Error parsing key')
        return ''
      }
      index++

      // Calculate the end index for padding
      let paddingEnd = index + key
      if (paddingEnd > encoded?.length) {
        paddingEnd = encoded?.length
      }

      // Extract message part after padding
      if (paddingEnd < encoded.length) {
        let messageEnd = paddingEnd + 2
        if (messageEnd > encoded.length) {
          messageEnd = encoded.length
        }
        message += encoded.substring(paddingEnd, messageEnd)
      }
      index = paddingEnd + 2
    }

    return message
  }

  const encoded = data?.data
  const message = decodeMessage(encoded)

  return { message, refetch }
}
