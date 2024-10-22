import { useEffect } from 'react'

export class LocalStorage {
  getItem(key, init) {
    return Storage.getItem(key, init)
  }

  setItem(key, item) {
    return Storage.setItem(key, item)
  }

  remove(key) {
    return Storage.remove(key)
  }

  clear() {
    return Storage.clear()
  }
}

export class Storage {
  static getItem(key, init) {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : init
    } catch (err) {
      console.log('error get item', err)
      return init
    }
  }

  static setItem(key, item) {
    try {
      window.localStorage.setItem(key, JSON.stringify(item))
      return true
    } catch (err) {
      console.log('error set item', err)
      return false
    }
  }

  static remove(key) {
    try {
      window.localStorage.removeItem(key)
      return true
    } catch (err) {
      console.log('error remove item', err)
      return false
    }
  }

  static clear() {
    try {
      window.localStorage.clear()
      return true
    } catch (err) {
      console.log('error clear storage', err)
      return false
    }
  }
}

/**
 * @typedef {Object} MessageData
 * @property {string} message
 * @property {string} [document]
 * @property {string} [filename]
 * @property {string} [thread_uuid]
 */

/**
 * @typedef {Object} LocalStorageType
 * @property {Record<string, MessageData>} lastMessage
 * @property {string} lastThreadUUID
 */

/**
 * @template {keyof LocalStorageType} K
 * @param {K} key
 * @returns {LocalStorageType[K] | null}
 */
export const getFromLocalStorage = (key) => {
  const item = localStorage.getItem(key)

  if (!item) {
    return null
  }

  const parsedItem = JSON.parse(item)
  return parsedItem
}

/**
 * @template {keyof LocalStorageType} K
 * @param {K} key
 * @param {LocalStorageType[K]} data
 */
export const saveToLocalStorage = (key, data) => {
  let stringifyData
  const oldData = getFromLocalStorage('lastMessage')
  if (oldData && key === 'lastMessage') {
    stringifyData = JSON.stringify({ ...oldData, ...data })
  } else {
    stringifyData = JSON.stringify(data)
  }

  localStorage.setItem(key, stringifyData)
}

/**
 * @template {keyof LocalStorageType} K
 * @param {K} key
 */
export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key)
}

/**
 * @template {keyof LocalStorageType} K
 * @param {K[]} keysToRemove
 */
export const useStorageCleanup = (keysToRemove) => {
  useEffect(() => {
    const handleTabClose = () => {
      keysToRemove.forEach((key) => {
        removeFromLocalStorage(key)
      })
    }

    window.addEventListener('beforeunload', handleTabClose)

    return () => {
      window.removeEventListener('beforeunload', handleTabClose)
    }
  }, [keysToRemove])
}
