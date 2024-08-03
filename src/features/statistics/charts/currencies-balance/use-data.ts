import { getCurrenciesBalanceChartData } from './get-data'
import { useAccountTransactions } from '@/entities/transactions'
import { CurrenciesBalanceEntry } from './data-type'
import { useEffect, useState } from 'react'
import { useCurrencies } from '@/entities/currency'
import { ratesStorage } from '@/entities/rates'

export function useCurrenciesBalanceChartData(): CurrenciesBalanceEntry[] {
  const { transactions } = useAccountTransactions()
  const currencies = useCurrencies()

  const [chartData, setChartData] = useState<CurrenciesBalanceEntry[]>([])

  useEffect(() => {
    ratesStorage.getRates(currencies.map(currency => currency.label)).then(rates => {
      const chartDataEntries = getCurrenciesBalanceChartData({
        transactions,
        currencies,
        rates
      })

      setChartData(chartDataEntries)
    })
  }, [currencies, transactions])

  return chartData
}