import { roundAsMoney, TransactionEntity, transactionWithdrawType } from '@/entities/transactions'
import { getTransactionAmountInUSD } from '../../utils/get-transaction-amount-in-usd'
import { CurrencyEntity } from '@/entities/currency'
import { ExpensesEntry } from './data-type'
import { RangeValues } from '@oleksii-pavlov/ranges'
import { RateEntity } from '@/entities/rates'
import { sum } from '@/shared/utils/numbers'

export interface GetExpensesChartParams {
  transactions: TransactionEntity[]
  currencies: CurrencyEntity[]
  rates: RateEntity[]
  dateRange: RangeValues
  interval: number
  formatDate: (date: number) => string
}

export function getExpensesChartData({ transactions, currencies, rates, dateRange, interval, formatDate }: GetExpensesChartParams): ExpensesEntry[] {
  const withdrawsTransactions = transactions.filter(transaction => transaction.type === transactionWithdrawType)

  const statisticTimeLength = dateRange.max - dateRange.min
  const statisticsGroupsAmount = Math.ceil(statisticTimeLength / interval)

  const statisticGroups = new Array(statisticsGroupsAmount).fill(0).map((_, index) => {
    const relatedTransactions = withdrawsTransactions.filter(transaction => (
      transaction.date >= dateRange.min + index * interval &&
      transaction.date < dateRange.min + (index + 1) * interval &&
      transaction.date >= dateRange.min && 
      transaction.date <= dateRange.max
    ))

    const groupDate = dateRange.min + index * interval

    const transactionsAmountInUSD = relatedTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))
    const totalGroupAmountInUSD = roundAsMoney(sum(...transactionsAmountInUSD))

    const formattedDate = formatDate(groupDate)

    return ({
      label: formattedDate,
      value: totalGroupAmountInUSD,
    })
  })

  return statisticGroups
}
