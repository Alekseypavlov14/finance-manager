import { accountsRepository, getAccountByFilters } from '@/entities/accounts'
import { credentialsStorage } from './credentials'
import { HTTPException } from '@/shared/utils/exception'

export async function deleteAccount() {
  const credentials = credentialsStorage.getValue()
  if (!credentials) throw new HTTPException(401)

  const account = await getAccountByFilters(credentials)
  if (!account) throw new HTTPException(404)

  return await accountsRepository.deleteById(account.id).catch(() => {
    throw new HTTPException(500)
  })
}
