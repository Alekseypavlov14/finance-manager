import { credentialsStorage } from './credentials'

export function signOut() {
  credentialsStorage.removeValue()
}