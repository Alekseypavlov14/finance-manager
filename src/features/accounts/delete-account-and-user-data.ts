import { credentialsStorage, deleteAccount } from '@/app/auth'
import { transactionRepository } from '@/entities/transactions'
import { getAccountByFilters } from '@/entities/accounts'
import { HTTPException } from '@/shared/utils/exception'

export async function deleteAccountAndUserData() {
  const credentials = credentialsStorage.getValue()
  if (!credentials) throw new HTTPException(401)

  const account = await getAccountByFilters(credentials)
  if (!account) throw new HTTPException(404)

  await deleteAccount()

  const transactions = await transactionRepository.getByFilters({ userId: account.id })

  await Promise.all(transactions.map(transaction => {
    return transactionRepository.deleteById(transaction.id)
  }))
}
