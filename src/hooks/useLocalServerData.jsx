import { StorageKey } from 'config/storage'
import { LocalStorage } from 'utils'

const storage = new LocalStorage()

export const localServerData = () => {
  const CURRENT_LANGUAGE =
    (storage.getItem(StorageKey?.CURRENT_LANGUAGE)) ?? null

  const setCurrentLanguage = (e) => {
    storage.setItem(StorageKey.CURRENT_LANGUAGE, e)
  }

  const BOOKING_LAWYER_PAYLOAD =
    (storage.getItem(StorageKey?.BOOKING_LAWYER_PAYLOAD)) ?? null

  const setBookingLawyerPayload = (e) => {
    storage.setItem(StorageKey.BOOKING_LAWYER_PAYLOAD, e)
  }

  return {
    setCurrentLanguage,
    setBookingLawyerPayload,
    
    BOOKING_LAWYER_PAYLOAD,
    CURRENT_LANGUAGE
  }
}
