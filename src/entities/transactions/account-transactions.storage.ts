import { TransactionEntity, transactionRepository } from '@/entities/transactions'
import { getAccountByFilters } from '@/entities/accounts'
import { credentialsStorage } from '@/app/auth'

export class AccountTransactionsStorage {
  async getValue(): Promise<TransactionEntity[]> {
    const credentials = credentialsStorage.getValue()
    if (!credentials) return []

    const account = await getAccountByFilters(credentials)
    if (!account) return []

    const accountTransactions = await transactionRepository.getByFilters({ userId: account.id })
    return accountTransactions
  }
}

export const accountTransactionsStorage = new AccountTransactionsStorage()
