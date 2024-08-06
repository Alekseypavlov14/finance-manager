import { clearCacheStorageKeys } from './constants'

export function clearCache() {
  clearCacheStorageKeys.forEach(key => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  })
}
