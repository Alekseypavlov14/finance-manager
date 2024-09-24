import { receivingTransactionTypes } from '../constants'
import { TransactionType } from '../types/transaction-type'

export function isTransactionTypeReceiving(type: TransactionType) {
  return receivingTransactionTypes.includes(type)
}
