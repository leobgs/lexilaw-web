import { StorageKey } from 'config/storage'
import { LocalStorage } from 'utils'

const storage = new LocalStorage()

export const localServerData = () => {
  const CURRENT_LANGUAGE =
    (storage.getItem(StorageKey?.CURRENT_LANGUAGE)) ?? null

  const setCurrentLanguage = (e) => {
    storage.setItem(StorageKey.CURRENT_LANGUAGE, e)
  }

  return {
    setCurrentLanguage,

    CURRENT_LANGUAGE
  }
}
