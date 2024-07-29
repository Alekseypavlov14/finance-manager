import { TransactionMoney } from './types/transaction-money'
import { TransactionType } from './types/transaction-type'
import { Id } from '@/shared/types/id'

export interface TransactionEntity {
  id: Id
  type: TransactionType
  description: string
  money: TransactionMoney
  date: number
}
