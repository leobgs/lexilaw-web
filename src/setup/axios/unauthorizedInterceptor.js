import { StorageKey } from 'config/storage'
import { LocalStorage } from 'utils'
import { removeFromLocalStorage } from 'utils/LocalStorage'

const storage = new LocalStorage()

export const funcIntercept = (code) => {
  if (code === 401) {
    storage.remove(StorageKey.ACCESS_TOKEN)
    storage.remove(StorageKey.IS_LOGIN)
    removeFromLocalStorage('lastMessage')
    storage.setItem('errorAuth', 'Session expired, please log in again.')
    window.location.reload()
  }
}
