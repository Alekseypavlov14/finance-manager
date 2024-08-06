import { transactionRepository } from '@/entities/transactions'
import { HTTPException } from '@/shared/utils/exception'
import { Id } from '@/shared/types/id'

export async function deleteTransaction(transactionId: Id) {
  const transaction = await transactionRepository.deleteById(transactionId)
  if (!transaction) throw new HTTPException(500)

  return transaction
}
