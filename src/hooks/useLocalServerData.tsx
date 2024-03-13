import { StorageKey } from 'config/storage'
import { LocalStorage } from 'utils'

export interface ServerDataProps {
  PRODUCTS_DATA: Array<object>
  CATEGORY_PRODUCTS_DATA: Array<object>
}

const storage = new LocalStorage()

export const localServerData = () => {
  const CURRENT_LANGUAGE =
    (storage.getItem(StorageKey?.CURRENT_LANGUAGE) as Array<object>) ??
    null
  

  const setCurrentLanguage = (e: Array<object>) => {
    storage.setItem(StorageKey.CURRENT_LANGUAGE, e)
  }

  

  return {
    setCurrentLanguage,

    CURRENT_LANGUAGE
  }
}
