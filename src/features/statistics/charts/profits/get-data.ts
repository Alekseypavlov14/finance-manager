import { getTransactionAmountInUSD, roundAsMoney, transactionDepositType, TransactionEntity, transactionWithdrawType } from "@/entities/transactions"
import { CurrencyEntity } from "@/entities/currency"
import { RangeValues } from "@oleksii-pavlov/ranges"
import { RateEntity } from "@/entities/rates"
import { DateTime } from '@oleksii-pavlov/date-time'
import { sum } from '@/shared/utils/numbers'

export interface GetProfitsChartParams {
  transactions: TransactionEntity[]
  currencies: CurrencyEntity[]
  rates: RateEntity[]
  dateRange: RangeValues
  interval: number
  formatDate: (date: number) => string
}

export function getProfitsChartData({ 
  transactions,
  currencies,
  rates,
  dateRange,
  interval,
  formatDate 
}: GetProfitsChartParams) {
  const depositTransactions = transactions.filter(transaction => transaction.type === transactionDepositType)
  const withdrawTransactions = transactions.filter(transactions => transactions.type === transactionWithdrawType)
  
  const statisticsTimeLength = dateRange.max - dateRange.min
  const statisticsGroupsAmount = Math.ceil(statisticsTimeLength / interval)

  const statisticGroups = new Array(statisticsGroupsAmount).fill(0).map((_, index) => {
    const relatedDepositTransactions = depositTransactions.filter(transaction => (
      transaction.date >= dateRange.min + index * interval &&
      transaction.date < dateRange.min + (index + 1) * interval &&
      transaction.date >= dateRange.min && 
      transaction.date <= dateRange.max
    ))

    const relatedWithdrawTransactions = withdrawTransactions.filter(transaction => (
      transaction.date >= dateRange.min + index * interval &&
      transaction.date < dateRange.min + (index + 1) * interval &&
      transaction.date >= dateRange.min && 
      transaction.date <= dateRange.max
    ))

    const groupDate = new DateTime(dateRange.min).getDateTimeAfter({
      milliseconds: index * interval
    }).getTimeInMilliseconds()

    const depositsAmountInUSD = relatedDepositTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))
    const withdrawsAmountInUSD = relatedWithdrawTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))

    const transactionsAmountInUSD = sum(...depositsAmountInUSD) - sum(...withdrawsAmountInUSD)
    const totalGroupAmountInUSD = roundAsMoney(transactionsAmountInUSD)

    const formattedDate = formatDate(groupDate)

    return ({
      label: formattedDate,
      value: totalGroupAmountInUSD,
      profits: totalGroupAmountInUSD,
    })
  })

  return statisticGroups
}
