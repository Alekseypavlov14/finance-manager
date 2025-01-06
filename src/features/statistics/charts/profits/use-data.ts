import { DAY_IN_MILLISECONDS, DAYS_PER_WEEK } from '@/shared/constants'
import { useAccountTransactions } from '@/entities/transactions'
import { getProfitsChartData } from './get-data'
import { useEffect, useState } from 'react'
import { formatShortWeek } from '@/shared/utils/date-time'
import { useCurrencies } from '@/entities/currency'
import { ProfitsEntry } from './data-type'
import { DateTime } from '@oleksii-pavlov/date-time'
import { useRates } from '@/entities/rates'

export function useProfitsChartData(): ProfitsEntry[] {
  const { transactions } = useAccountTransactions()
  const { currencies } = useCurrencies()
  const { rates } = useRates() 

  const [chartData, setChartData] = useState<ProfitsEntry[]>([])

  useEffect(() => {
    setChartData(getProfitsChartData({
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
          .getFirstDayOfWeek(1)
          .getDateTimeAfter({ days: DAYS_PER_WEEK })
          .getTimeInMilliseconds()
      },
      interval: DAYS_PER_WEEK * DAY_IN_MILLISECONDS,
      formatDate: formatShortWeek
    }))
  }, [currencies, transactions, rates])

  return chartData
}