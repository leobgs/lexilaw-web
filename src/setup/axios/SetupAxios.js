import { Storage } from 'utils/LocalStorage'
import { authKey } from 'config/app'
import { funcIntercept } from './unauthorizedInterceptor'

export default function setupAxios(axios) {
  axios.interceptors.request.use(
    (config) => {
      const token = Storage.getItem(authKey)

      if (token?.access_token) {
        config.headers.Authorization = `Bearer ${token.access_token?.token}`
      }

      return config
    },
    (err) => Promise.reject(err)
  )

  axios.interceptors.response.use(
    (res) => {
      return res
    },
    (err) => {
      funcIntercept(err?.response?.status)
      Promise.reject(err)
    }
  )
}
