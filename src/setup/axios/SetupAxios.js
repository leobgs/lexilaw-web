import { Storage } from 'utils/LocalStorage'

export default function setupAxios(axios) {
  axios.interceptors.request.use(
    (config) => {
      const token = Storage.getItem(authKey)

      if (token?.access_token) {
        config.headers.Authorization = `Bearer ${token.access_token}`
      }

      return config
    },
    (err) => Promise.reject(err)
  )

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      return Promise.reject(err)
    }
  )
}
