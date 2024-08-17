import { StorageKey } from 'config/storage'
import { LocalStorage } from 'utils'

const storage = new LocalStorage()

export const localServerData = () => {
  const CURRENT_LANGUAGE = storage.getItem(StorageKey?.CURRENT_LANGUAGE) ?? null

  const setCurrentLanguage = (e) => {
    storage.setItem(StorageKey.CURRENT_LANGUAGE, e)
  }

  const setLatest_uuid = (e) => {
    storage.setItem(StorageKey.LAST_UUID, e)
  }

  const clearLatest_uuid = () => {
    storage.clear(StorageKey.LAST_UUID)
  }

  const getUUID = storage.getItem(StorageKey?.LAST_UUID) ?? null

  const BOOKING_LAWYER_PAYLOAD =
    storage.getItem(StorageKey?.BOOKING_LAWYER_PAYLOAD) ?? null

  const setBookingLawyerPayload = (e) => {
    storage.setItem(StorageKey.BOOKING_LAWYER_PAYLOAD, e)
  }

  return {
    setCurrentLanguage,
    setBookingLawyerPayload,
    setLatest_uuid,
    clearLatest_uuid,
    getUUID,
    BOOKING_LAWYER_PAYLOAD,
    CURRENT_LANGUAGE,
  }
}
