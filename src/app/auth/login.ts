import { Credentials, credentialsStorage } from './credentials'
import { getAccountByFilters } from '@/entities/accounts'
import { HTTPException } from '@/shared/utils/exception'

export async function login(credentials: Credentials) {
  const account = await getAccountByFilters({
    email: credentials.email,
    password: credentials.password
  })

  if (!account) throw new HTTPException(401)

  credentialsStorage.setValue(credentials)
}
