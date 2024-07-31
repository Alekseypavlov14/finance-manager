import { TransactionEntity, TransactionEntityDTO } from './transaction.entity'
import { FirebaseRepository } from '@/shared/utils/firebase'

export const transactionRepository = new FirebaseRepository<TransactionEntity, TransactionEntityDTO>('transactions')
