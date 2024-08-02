import { TransactionEntity } from '@/entities/transactions'

export interface TransactionGroup {
  label: string
  transactions: TransactionEntity[]
}
