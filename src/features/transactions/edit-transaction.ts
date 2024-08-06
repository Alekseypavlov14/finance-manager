import { TransactionEntity, transactionRepository } from '@/entities/transactions'
import { TransactionClientData } from './types/transaction-client-data'
import { HTTPException } from '@/shared/utils/exception'
import { Id } from '@/shared/types/id'

export async function editTransaction(id: Id, transactionClientData: TransactionClientData): Promise<TransactionEntity> {
  const updatedTransaction = await transactionRepository.updateById(id, transactionClientData)
  if (!updatedTransaction) throw new HTTPException(500)

  return updatedTransaction
}
