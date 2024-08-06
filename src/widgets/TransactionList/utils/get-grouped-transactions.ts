import { getTransactionAmountInUSD, transactionDepositType, TransactionEntity, transactionWithdrawType } from '@/entities/transactions'
import { mapGroupingTypeToIndexGetter, mapGroupingTypeToLabelRenderer } from '../constants'
import { TransactionGroupType } from '../types/transaction-group-type'
import { TransactionGroup } from '../types/transaction-group'
import { CurrencyEntity } from '@/entities/currency'
import { RateEntity } from '@/entities/rates'
import { sum } from '@/shared/utils/numbers'

export interface GetGroupedTransactionsParams {
  transactions: TransactionEntity[]
  currencies: CurrencyEntity[]
  rates: RateEntity[]
  groupingType: TransactionGroupType
}

export function getGroupedTransactions({ transactions, currencies, rates, groupingType }: GetGroupedTransactionsParams): TransactionGroup[] {
  const groupIndexes = transactions.map(transaction => getTransactionGroupIndex(transaction, groupingType))
  const uniqueIndexes = Array.from(new Set(groupIndexes))

  const transactionGroups: TransactionGroup[] = uniqueIndexes.map(index => {
    const groupTransactions = filterTransactionsByGroupingIndex(transactions, groupingType, index)

    const depositTransactions = groupTransactions.filter(transaction => transaction.type === transactionDepositType)
    const withdrawTransactions = groupTransactions.filter(transaction => transaction.type === transactionWithdrawType)

    const depositTransactionsAmounts = depositTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))
    const withdrawTransactionsAmounts = withdrawTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))

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
