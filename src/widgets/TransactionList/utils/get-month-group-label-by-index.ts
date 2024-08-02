import { formatMonth } from '@/shared/utils/date-time'
import { DateTime } from '@oleksii-pavlov/date-time'

export function getMonthGroupLabelByIndex(index: number): string {
  const today = new DateTime()

  const firstDayOfThisMonth = today.getDateTimeBefore({ days: today.getDate().getDate() - 1 })
  const firstDayOfGivenMonth = firstDayOfThisMonth.getDateTimeBefore({ months: index })

  return formatMonth(firstDayOfGivenMonth.getTimeInMilliseconds())
}
