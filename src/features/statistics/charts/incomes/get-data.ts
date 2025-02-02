import { getTransactionAmountInUSD, roundAsMoney, transactionDepositType, TransactionEntity } from "@/entities/transactions"
import { CurrencyEntity } from "@/entities/currency"
import { RangeValues } from "@oleksii-pavlov/ranges"
import { RateEntity } from "@/entities/rates"
import { DateTime } from '@oleksii-pavlov/date-time'
import { sum } from '@/shared/utils/numbers'

export interface GetIncomesChartParams {
  transactions: TransactionEntity[]
  currencies: CurrencyEntity[]
  rates: RateEntity[]
  dateRange: RangeValues
  interval: number
  formatDate: (date: number) => string
}

export function getIncomesChartData({ 
  transactions,
  currencies,
  rates,
  dateRange,
  interval,
  formatDate 
}: GetIncomesChartParams) {
  const depositTransactions = transactions.filter(transaction => transaction.type === transactionDepositType)

  const statisticsTimeLength = dateRange.max - dateRange.min
  const statisticsGroupsAmount = Math.ceil(statisticsTimeLength / interval)

  const statisticGroups = new Array(statisticsGroupsAmount).fill(0).map((_, index) => {
    const relatedTransactions = depositTransactions.filter(transaction => (
      transaction.date >= dateRange.min + index * interval &&
      transaction.date < dateRange.min + (index + 1) * interval &&
      transaction.date >= dateRange.min && 
      transaction.date <= dateRange.max
    ))

    const groupDate = new DateTime(dateRange.min).getDateTimeAfter({
      milliseconds: index * interval
    }).getTimeInMilliseconds()

    const transactionsAmountInUSD = relatedTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))
    const totalGroupAmountInUSD = roundAsMoney(sum(...transactionsAmountInUSD))

    const formattedDate = formatDate(groupDate)

    return ({
      label: formattedDate,
      value: totalGroupAmountInUSD,
      incomes: totalGroupAmountInUSD,
    })
  })

  return statisticGroups
}
