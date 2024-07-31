import { TransactionMoney } from './types/transaction-money'
import { TransactionType } from './types/transaction-type'
import { Nullable } from '@/shared/types/nullable'
import { Entity } from '@/shared/types/entity'
import { Id } from '@/shared/types/id'

export interface TransactionEntity extends Entity {
  userId: Nullable<Id>
  type: TransactionType
  description: string
  money: TransactionMoney
  date: number
}

export interface TransactionEntityDTO extends Omit<TransactionEntity, 'id'> {}
