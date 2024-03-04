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
