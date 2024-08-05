import { DAY_IN_MILLISECONDS, DAYS_PER_WEEK } from '@/shared/constants'
import { useAccountTransactions } from '@/entities/transactions'
import { getBalanceChartData } from './get-data'
import { useEffect, useState } from 'react'
import { BalanceChartEntry } from './data-type'
import { formatShortWeek } from '@/shared/utils/date-time'
import { useCurrencies } from '@/entities/currency'
import { useRates } from '@/entities/rates'
import { DateTime } from '@oleksii-pavlov/date-time'

export function useBalanceChartData(): BalanceChartEntry[] {
  const { transactions } = useAccountTransactions()
  const currencies = useCurrencies()
  const { rates } = useRates()

  const [chartData, setChartData] = useState<BalanceChartEntry[]>([])

  useEffect(() => {
    setChartData(getBalanceChartData({
      transactions,
      currencies,
      rates,
      dateRange: {
        min: new DateTime()
          .normalizeDate()
          .getDateTimeBefore({ days: new DateTime().getDate().getDay() === 0 ? 1 : 0 })
          .getFirstDayOfWeek()
          .getDateTimeAfter({ days: 1 })
          .getDateTimeBefore({ days: DAYS_PER_WEEK * 8 })
          .getTimeInMilliseconds(),
        max: new DateTime()
          .normalizeDate()
          .getDateTimeBefore({ days: new DateTime().getDate().getDay() === 0 ? 1 : 0 })
          .getLastDayOfWeek()
          .getDateTimeAfter({ days: 1 })
          .getTimeInMilliseconds()
      },
      interval: DAYS_PER_WEEK * DAY_IN_MILLISECONDS,
      formatDate: formatShortWeek
    }))
  }, [transactions, currencies, rates])

  return chartData
}