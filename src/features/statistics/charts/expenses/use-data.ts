import { DAY_IN_MILLISECONDS, DAYS_PER_WEEK } from '@/shared/constants'
import { useAccountTransactions } from '@/entities/transactions'
import { getExpensesChartData } from './get-data'
import { useEffect, useState } from 'react'
import { formatShortWeek } from '@/shared/utils/date-time'
import { useCurrencies } from '@/entities/currency'
import { ExpensesEntry } from './data-type'
import { DateTime } from '@oleksii-pavlov/date-time'
import { useRates } from '@/entities/rates'

export function useExpensesChartData(): ExpensesEntry[] {
  const { transactions } = useAccountTransactions()
  const { currencies } = useCurrencies()
  const { rates } = useRates() 

  const [chartData, setChartData] = useState<ExpensesEntry[]>([])

  useEffect(() => {
    setChartData(getExpensesChartData({
      transactions,
      currencies,
      rates,
      dateRange: {
        min: new DateTime()
          .normalizeDate()
          .getFirstDayOfWeek(1)
          .getDateTimeBefore({ days: DAYS_PER_WEEK * 8 })
          .getTimeInMilliseconds(),
        max: new DateTime()
          .normalizeDate()
          .getLastDayOfWeek(1)
          .getDateTimeAfter({ days: 1 })
          .getDateTimeBefore({ milliseconds: 1 })
          .getTimeInMilliseconds()
      },
      interval: DAYS_PER_WEEK * DAY_IN_MILLISECONDS,
      formatDate: formatShortWeek
    }))
  }, [currencies, transactions, rates])

  return chartData
}