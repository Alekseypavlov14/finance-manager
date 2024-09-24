import { losingTransactionTypes } from '../constants'
import { TransactionType } from '../types/transaction-type'

export function isTransactionTypeLosing(type: TransactionType) {
  return losingTransactionTypes.includes(type)
}
