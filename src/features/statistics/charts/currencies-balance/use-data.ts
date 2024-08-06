import { getCurrenciesBalanceChartData } from './get-data'
import { useAccountTransactions } from '@/entities/transactions'
import { CurrenciesBalanceEntry } from './data-type'
import { useEffect, useState } from 'react'
import { useCurrencies } from '@/entities/currency'
import { useRates } from '@/entities/rates'

export function useCurrenciesBalanceChartData(): CurrenciesBalanceEntry[] {
  const { transactions } = useAccountTransactions()
  const { currencies } = useCurrencies()
  const { rates } = useRates()

  const [chartData, setChartData] = useState<CurrenciesBalanceEntry[]>([])

  useEffect(() => {
    setChartData(getCurrenciesBalanceChartData({
      transactions,
      currencies,
      rates
    }))
  }, [transactions, currencies, rates])

  return chartData
}