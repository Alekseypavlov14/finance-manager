import { FirebaseRepository } from '@/shared/utils/firebase'
import { TransactionEntity } from './transaction.entity'

export const transactionRepository = new FirebaseRepository<TransactionEntity>('transactions')
