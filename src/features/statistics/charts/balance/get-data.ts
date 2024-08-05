import { roundAsMoney, transactionDepositType, TransactionEntity, transactionWithdrawType } from '@/entities/transactions'
import { BalanceChartEntry } from './data-type'
import { CurrencyEntity } from '@/entities/currency'
import { RangeValues } from '@oleksii-pavlov/ranges'
import { RateEntity } from '@/entities/rates'
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
  const statisticsGroupsAmount = Math.ceil(statisticsTimeLength / interval)

  const statisticGroups = new Array(statisticsGroupsAmount).fill(0).map((_, index) => {
    const relatedTransactions = transactions.filter(transaction => (
      transaction.date < dateRange.min + index * interval &&
      transaction.date <= dateRange.max
    ))

    const groupDate = dateRange.min + index * interval

    const relatedDepositTransactions = relatedTransactions.filter(transaction => transaction.type === transactionDepositType)
    const relatedWithdrawTransactions = relatedTransactions.filter(transaction => transaction.type === transactionWithdrawType)

    const depositAmountsInUSD = relatedDepositTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))
    const withdrawAmountsInUSD = relatedWithdrawTransactions.map(transaction => getTransactionAmountInUSD(transaction, currencies, rates))

    const totalDepositAmount = sum(...depositAmountsInUSD)
    const totalWithdrawAmount = sum(...withdrawAmountsInUSD)

    const totalAmountInUSD = roundAsMoney(totalDepositAmount - totalWithdrawAmount)

    const formattedDate = formatDate(groupDate)

    return ({ 
      label: formattedDate, 
      value: totalAmountInUSD 
    })
  })

  return statisticGroups
}

function getTransactionAmountInUSD(transaction: TransactionEntity, currencies: CurrencyEntity[], rates: RateEntity[]) {
  const currency = currencies.find(currency => currency.id === transaction.money.currencyId)
  if (!currency) return 0

  const rate = rates.find(rate => rate.currencyCode === currency.label)
  if (!rate || !rate.rateToUSD) return 0

  const transactionAmountInUSD = transaction.money.amount / rate.rateToUSD

  return transactionAmountInUSD
}
