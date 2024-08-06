import { transactionDepositType, TransactionEntity, transactionWithdrawType } from '@/entities/transactions'
import { mapGroupingTypeToIndexGetter, mapGroupingTypeToLabelRenderer } from '../constants'
import { TransactionGroupType } from '../types/transaction-group-type'
import { TransactionGroup } from '../types/transaction-group'
import { sum } from '@/shared/utils/numbers'

export function getGroupedTransactions(transactions: TransactionEntity[], groupingType: TransactionGroupType): TransactionGroup[] {
  const groupIndexes = transactions.map(transaction => getTransactionGroupIndex(transaction, groupingType))
  const uniqueIndexes = Array.from(new Set(groupIndexes))

  const transactionGroups: TransactionGroup[] = uniqueIndexes.map(index => {
    const groupTransactions = filterTransactionsByGroupingIndex(transactions, groupingType, index)

    const depositTransactions = groupTransactions.filter(transaction => transaction.type === transactionDepositType)
    const withdrawTransactions = groupTransactions.filter(transaction => transaction.type === transactionWithdrawType)

    const depositTransactionsAmounts = depositTransactions.map(transaction => transaction.money.amount)
    const withdrawTransactionsAmounts = withdrawTransactions.map(transaction => transaction.money.amount)

    const totalIncomes = sum(...depositTransactionsAmounts)
    const totalExpenses = sum(...withdrawTransactionsAmounts)

    return ({
      label: mapGroupingTypeToLabelRenderer[groupingType](index),
      incomes: totalIncomes,
      expenses: totalExpenses,
      transactions: filterTransactionsByGroupingIndex(transactions, groupingType, index)
    })
  })

  return transactionGroups
}

function filterTransactionsByGroupingIndex(transactions: TransactionEntity[], groupingType: TransactionGroupType, index: number): TransactionEntity[] {
  return transactions.filter(transaction => getTransactionGroupIndex(transaction, groupingType) === index)
}

function getTransactionGroupIndex(transaction: TransactionEntity, groupingType: TransactionGroupType): number {
  return mapGroupingTypeToIndexGetter[groupingType](transaction)
}
