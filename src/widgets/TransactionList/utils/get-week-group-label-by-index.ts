import { formatFullDate, formatFullDateWithoutYear } from '@/shared/utils/date-time'
import { DAYS_PER_WEEK } from '@/shared/constants'
import { DateTime } from '@oleksii-pavlov/date-time'

export function getWeekGroupLabelByIndex(index: number): string {
  const firstDayOfWeek = new DateTime().normalizeDate().getFirstDayOfWeek()

  const firstDayOfGivenWeek = firstDayOfWeek.getDateTimeBefore({ days: DAYS_PER_WEEK * index }).getDateTimeAfter({ days: 1 })
  const lastDayOfGivenWeek = firstDayOfGivenWeek.getLastDayOfWeek().getDateTimeAfter({ days: 1 })

  const formatter = isDateFromTheSameYear(firstDayOfGivenWeek) && isDateFromTheSameYear(lastDayOfGivenWeek)
    ? formatFullDateWithoutYear
    : formatFullDate

  return `${formatter(firstDayOfGivenWeek.getTimeInMilliseconds())} - ${formatter(lastDayOfGivenWeek.getTimeInMilliseconds())}`
}

function isDateFromTheSameYear(date: DateTime): boolean {
  return date.getTimeData().years === new DateTime().getTimeData().years
}
