import { TransactionFormData } from '../types/transaction-form-data'
import { TransactionEntity } from '@/entities/transactions'

export function mapTransactionToFormData(transaction: TransactionEntity): TransactionFormData {
  return ({
    type: transaction.type,
    receivedCurrencyId: transaction.money.received.currencyId,
    receivedAmount: transaction.money.received.amount,
    lostCurrencyId: transaction.money.lost.currencyId,
    lostAmount: transaction.money.lost.amount,
    date: transaction.date,
    description: transaction.description,
  })
}
