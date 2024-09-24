import { roundAsMoney, transactionDepositType, TransactionEntity, transactionExchangeType, transactionWithdrawType } from '@/entities/transactions'
import { currenciesBalanceChartMaxGroupsAmount } from '../../constants'
import { formatCurrenciesBalanceLabel } from './format-label'
import { getAmountInUSD, RateEntity } from '@/entities/rates'
import { getOtherCurrenciesLabel } from '../../utils/get-other-currencies-label'
import { CurrenciesBalanceEntry } from './data-type'
import { CurrencyEntity } from '@/entities/currency'
import { Collection } from '@oleksii-pavlov/collections'
import { Nullable } from '@/shared/types/nullable'
import { groupBy } from '@/shared/utils/entities'
import { sum } from '@/shared/utils/numbers'

export interface GetCurrencyBalanceParams {
  transactions: TransactionEntity[]
  currencies: CurrencyEntity[]
  rates: RateEntity[]
}

export function getCurrenciesBalanceChartData({ transactions, currencies, rates }: GetCurrencyBalanceParams): CurrenciesBalanceEntry[] {
  const transactionsWithDefinedCurrency = transactions.filter(transaction => transaction.money.received.currencyId !== null || transaction.money.lost.currencyId !== null)
  const transactionGroupedByCurrency = groupBy(transactionsWithDefinedCurrency, transaction => [transaction.money.received.currencyId, transaction.money.lost.currencyId])

  const chartDataEntries: Nullable<CurrenciesBalanceEntry>[] = transactionGroupedByCurrency.map<Nullable<CurrenciesBalanceEntry>>((group) => {
    const currency = currencies.find(currency => currency.id === group.key)
    if (!currency) return null

    const depositTransactions = group.entities.filter(transaction => transaction.type === transactionDepositType)
    const withdrawTransactions = group.entities.filter(transaction => transaction.type === transactionWithdrawType)
    const exchangeTransactions = group.entities.filter(transaction => transaction.type === transactionExchangeType)

    const totalDepositsAmount = sum(
      ...depositTransactions.map(transaction => transaction.money.received.amount),
      ...exchangeTransactions
        .filter(transaction => transaction.money.received.currencyId === currency.id)
        .map(transaction => transaction.money.received.amount),
    )

    const totalWithdrawsAmount = sum(
      ...withdrawTransactions.map(transaction => transaction.money.lost.amount),
      ...exchangeTransactions
        .filter(transaction => transaction.money.lost.currencyId === currency.id)
        .map(transaction => transaction.money.lost.amount),
    )

    const balance = totalDepositsAmount - totalWithdrawsAmount

    const balanceInUSD = getAmountInUSD(balance, currency.label, rates)

    return ({
      amount: roundAsMoney(balance),
      value: roundAsMoney(balanceInUSD),
      label: formatCurrenciesBalanceLabel(balance, currency.label, balanceInUSD),
      name: currency.label,
    })
  })

  const filteredChartDataEntries = chartDataEntries.filter(entry => entry !== null && entry.amount > 0) as CurrenciesBalanceEntry[]

  const sortedChartDataByAmountDescending = new Collection(filteredChartDataEntries).sortDescendingBy(group => group.value).getItems()

  const otherCurrenciesGroups = sortedChartDataByAmountDescending.slice(currenciesBalanceChartMaxGroupsAmount - 1)
  const otherCurrenciesGroup: CurrenciesBalanceEntry = {
    label: getOtherCurrenciesLabel(otherCurrenciesGroups.map(group => group.name)),
    value: sum(...otherCurrenciesGroups.map(group => group.value)),
    name: 'Others',
    amount: 0,
  }

  const slicedChartDataEntries = sortedChartDataByAmountDescending.length > currenciesBalanceChartMaxGroupsAmount
    ? sortedChartDataByAmountDescending.slice(0, currenciesBalanceChartMaxGroupsAmount - 1).concat([ otherCurrenciesGroup ])
    : sortedChartDataByAmountDescending

  return slicedChartDataEntries
}
