import { TransactionMoney } from './types/transaction-money'
import { TransactionType } from './types/transaction-type'
import { Entity } from '@/shared/types/entity'
import { Id } from '@/shared/types/id'

export interface TransactionEntity extends Entity {
  userId: Id
  type: TransactionType
  description: string
  money: TransactionMoney
  date: number
}
