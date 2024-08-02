import { mapGroupingTypeToIndexGetter, mapGroupingTypeToLabelRenderer } from '../constants'
import { TransactionGroupType } from '../types/transaction-group-type'
import { TransactionEntity } from '@/entities/transactions'
import { TransactionGroup } from '../types/transaction-group'

export function getGroupedTransactions(transactions: TransactionEntity[], groupingType: TransactionGroupType): TransactionGroup[] {
  const groupIndexes = transactions.map(transaction => getTransactionGroupIndex(transaction, groupingType))
  const uniqueIndexes = Array.from(new Set(groupIndexes))

  const transactionGroups: TransactionGroup[] = uniqueIndexes.map(index => ({
    label: mapGroupingTypeToLabelRenderer[groupingType](index),
    transactions: filterTransactionsByGroupingIndex(transactions, groupingType, index)
  }))

  return transactionGroups
}

function filterTransactionsByGroupingIndex(transactions: TransactionEntity[], groupingType: TransactionGroupType, index: number): TransactionEntity[] {
  return transactions.filter(transaction => getTransactionGroupIndex(transaction, groupingType) === index)
}

function getTransactionGroupIndex(transaction: TransactionEntity, groupingType: TransactionGroupType): number {
  return mapGroupingTypeToIndexGetter[groupingType](transaction)
}
