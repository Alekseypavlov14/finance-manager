import { DAY_IN_MILLISECONDS, DAYS_PER_WEEK } from '@/shared/constants'
import { TransactionEntity } from '@/entities/transactions'
import { DateTime } from '@oleksii-pavlov/date-time'

export function getTransactionWeekIndex(transaction: TransactionEntity): number {
  const firstDayOfWeek = new DateTime().normalizeDate().getFirstDayOfWeek().getDateTimeAfter({ days: 1 })
  const endOfWeekMoment = firstDayOfWeek.getDateTimeAfter({ days: DAYS_PER_WEEK }).getDateTimeBefore({ milliseconds: 1 })

  const timeDifference = endOfWeekMoment.getTimeInMilliseconds() - transaction.date
  const weekDifference = timeDifference / (DAYS_PER_WEEK * DAY_IN_MILLISECONDS)

  return Math.floor(weekDifference)
}
