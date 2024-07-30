import { Credentials, credentialsStorage } from './credentials'
import { accountsRepository } from '@/entities/accounts'
import { HTTPException } from '@/shared/utils/exception'

export async function signUp(credentials: Credentials) {
  const accountCandidates = await accountsRepository.getByFilters({
    email: credentials.email,
    password: credentials.password
  })

  const accountExists = accountCandidates.length > 0
  if (accountExists) throw new HTTPException(409)

  const newAccount = await accountsRepository.create({
    email: credentials.email,
    password: credentials.password
  })

  if (!newAccount) throw new HTTPException(500)

  credentialsStorage.setValue({
    email: newAccount.email,
    password: newAccount.password
  })
}
