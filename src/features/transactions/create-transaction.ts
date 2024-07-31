import { TransactionEntityDTO, transactionRepository } from '@/entities/transactions'
import { TransactionClientData } from './types/transaction-client-data'
import { credentialsStorage } from '@/app/auth'
import { accountsRepository } from '@/entities/accounts'
import { HTTPException } from '@/shared/utils/exception'

export async function createTransaction(transactionClientData: TransactionClientData) {
  const credentials = credentialsStorage.getValue()
  if (!credentials) throw new HTTPException(401)

  const candidates = await accountsRepository.getByFilters(credentials)
  if (candidates.length === 0) throw new HTTPException(401)

  const account = candidates[0]

  const transactionDTO: TransactionEntityDTO = {
    ...transactionClientData,
    userId: account.id
  }

  const transaction = await transactionRepository.create(transactionDTO)
  if (!transaction) throw new HTTPException(500)

  return transaction
} 
