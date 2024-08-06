import { TransactionEntity } from '@/entities/transactions'

export interface TransactionGroup {
  label: string
  incomes: number
  expenses: number
  transactions: TransactionEntity[]
}
