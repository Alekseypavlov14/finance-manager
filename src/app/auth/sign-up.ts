import { accountsRepository, getAccountByFilters } from '@/entities/accounts'
import { Credentials, credentialsStorage } from './credentials'
import { HTTPException } from '@/shared/utils/exception'

export async function signUp(credentials: Credentials) {
  const accountWithSameEmail = await getAccountByFilters({
    email: credentials.email,
  })

  if (accountWithSameEmail) throw new HTTPException(409)

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
