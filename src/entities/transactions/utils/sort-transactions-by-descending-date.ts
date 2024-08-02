import { TransactionEntity } from '../transaction.entity'
import { Collection } from '@oleksii-pavlov/collections'

export function sortTransactionsByDescendingDate(transactions: TransactionEntity[]): TransactionEntity[] {
  return new Collection(transactions).sortDescendingBy(transaction => transaction.date).getItems()
}