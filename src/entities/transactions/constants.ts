import { TransactionType } from './types/transaction-type'

export const transactionDepositType: TransactionType = 'deposit'
export const transactionWithdrawType: TransactionType = 'withdraw'
export const transactionExchangeType: TransactionType = 'exchange'

export const receivingTransactionTypes: TransactionType[] = [
  transactionDepositType,
  transactionExchangeType
]

export const losingTransactionTypes: TransactionType[] = [
  transactionWithdrawType,
  transactionExchangeType
]
