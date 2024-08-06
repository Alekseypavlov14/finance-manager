import { TransactionFormData } from '../types/transaction-form-data'
import { TransactionEntity } from '@/entities/transactions'

export function mapTransactionToFormData(transaction: TransactionEntity): TransactionFormData {
  return ({
    type: transaction.type,
    amount: transaction.money.amount,
    currencyId: transaction.money.currencyId,
    date: transaction.date,
    description: transaction.description,
  })
}
