import { StorageKey } from 'config/storage'
import { LocalStorage } from 'utils'

const storage = new LocalStorage()

export const funcIntercept = (code) => {
  if (code === 401) {
    storage.remove(StorageKey.ACCESS_TOKEN)
    storage.remove(StorageKey.IS_LOGIN)
    window.location.reload()
  }
}
