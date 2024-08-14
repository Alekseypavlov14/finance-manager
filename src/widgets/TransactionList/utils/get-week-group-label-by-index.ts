import { formatFullDate, formatFullDateWithoutYear } from '@/shared/utils/date-time'
import { DAYS_PER_WEEK } from '@/shared/constants'
import { DateTime } from '@oleksii-pavlov/date-time'

export function getWeekGroupLabelByIndex(index: number): string {
  const firstDayOfWeek = new DateTime().normalizeDate().getFirstDayOfWeek(1)

  const firstDayOfGivenWeek = firstDayOfWeek.getDateTimeBefore({ days: DAYS_PER_WEEK * index })
  const lastDayOfGivenWeek = firstDayOfGivenWeek.getLastDayOfWeek(1)

  const formatter = isDateFromTheSameYear(firstDayOfGivenWeek) && isDateFromTheSameYear(lastDayOfGivenWeek)
    ? formatFullDateWithoutYear
    : formatFullDate

  return `${formatter(firstDayOfGivenWeek.getTimeInMilliseconds())} - ${formatter(lastDayOfGivenWeek.getTimeInMilliseconds())}`
}

function isDateFromTheSameYear(date: DateTime): boolean {
  return date.getTimeData().years === new DateTime().getTimeData().years
}
