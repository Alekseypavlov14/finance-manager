import { LocalStorage } from '@oleksii-pavlov/storages'

export interface Credentials {
  email: string
  password: string
}

export const credentialsStorage = new LocalStorage<Credentials>('credentials')
