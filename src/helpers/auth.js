import { StorageKey } from 'config/storage'
import { LocalStorage } from 'utils'

export const authorization = (config = {}) => {
  const storage = new LocalStorage()

  const token = storage.getItem(StorageKey.ACCESS_TOKEN, '')
  if (token) {
    const Authorization = `${token.token_type} ${token.access_token}`
    config.headers = { Authorization, ...config.headers }
  }
}
