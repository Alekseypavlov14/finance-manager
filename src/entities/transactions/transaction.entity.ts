import { TransactionMoney } from './types/transaction-money'
import { TransactionType } from './types/transaction-type'
import { Entity } from '@/shared/types/entity'

export interface TransactionEntity extends Entity {
  type: TransactionType
  description: string
  money: TransactionMoney
  date: number
}
