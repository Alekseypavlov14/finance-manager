import { credentialsStorage } from './credentials'
import { validationCacheStorage } from './validations.cache'

export function signOut() {
  validationCacheStorage.removeValue()
  credentialsStorage.removeValue()
}