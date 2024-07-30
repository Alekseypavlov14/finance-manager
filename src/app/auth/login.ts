import { Credentials, credentialsStorage } from './credentials'
import { accountsRepository } from '@/entities/accounts'
import { HTTPException } from '@/shared/utils/exception'

export async function login(credentials: Credentials) {
  const accountCandidates = await accountsRepository.getByFilters({
    email: credentials.email,
    password: credentials.password
  })

  const accountExists = accountCandidates.length > 0
  if (!accountExists) throw new HTTPException(401)

  credentialsStorage.setValue(credentials)
}
