import { roundAsMoney, transactionDepositType, TransactionEntity, transactionWithdrawType, getTransactionAmountInUSD, transactionExchangeType, getTransactionAmountInUSDByCurrencyId } from '@/entities/transactions'
import { BalanceChartEntry } from './data-type'
import { CurrencyEntity } from '@/entities/currency'
import { RangeValues } from '@oleksii-pavlov/ranges'
import { RateEntity } from '@/entities/rates'
import { DateTime } from '@oleksii-pavlov/date-time'
import { sum } from '@/shared/utils/numbers'

export interface GetBalanceChartParams {
  transactions: TransactionEntity[]
  currencies: CurrencyEntity[]
  rates: RateEntity[]
  dateRange: RangeValues
  interval: number
  formatDate: (date: number) => string
}

export function getBalanceChartData({ transactions, currencies, rates, dateRange, interval, formatDate }: GetBalanceChartParams): BalanceChartEntry[] {
  const statisticsTimeLength = dateRange.max - dateRange.min
  const statisticsGroupsAmount = Math.round(statisticsTimeLength / interval)

  const statisticGroups = new Array(statisticsGroupsAmount).fill(0).map((_, index) => {
    const relatedTransactions = transactions.filter(transaction => (
      transaction.date < dateRange.min + interval * (index + 1) &&
      transaction.date <= dateRange.max
    ))

    const groupDate = new DateTime(dateRange.min).getDateTimeAfter({
      milliseconds: index * interval
    }).getTimeInMilliseconds()

    const relatedDepositTransactions = relatedTransactions.filter(transaction => transaction.type === transactionDepositType)
    const relatedWithdrawTransactions = relatedTransactions.filter(transaction => transaction.type === transactionWithdrawType)
    const relatedExchangeTransactions = relatedTransactions.filter(transaction => transaction.type === transactionExchangeType)

    const depositAmountsInUSD = relatedDepositTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))
    const withdrawAmountsInUSD = relatedWithdrawTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))

    const exchangeAmountsInUSD = relatedExchangeTransactions.map(transaction => {
      if (!transaction.money.received.currencyId || !transaction.money.lost.currencyId) return 0

      const received = getTransactionAmountInUSDByCurrencyId(transaction.money.received.amount, transaction.money.received.currencyId, currencies, rates)
      const lost = getTransactionAmountInUSDByCurrencyId(transaction.money.lost.amount, transaction.money.lost.currencyId, currencies, rates)

      return received - lost
    })
    
    const totalDepositAmount = sum(...depositAmountsInUSD)
    const totalWithdrawAmount = sum(...withdrawAmountsInUSD)
    const totalExchangeAmount = sum(...exchangeAmountsInUSD)

    const totalAmountInUSD = roundAsMoney(totalDepositAmount - totalWithdrawAmount + totalExchangeAmount)

    const formattedDate = formatDate(groupDate)

    return ({ 
      label: formattedDate, 
      value: totalAmountInUSD,
      balance: totalAmountInUSD,
    })
  })

  return statisticGroups
}
