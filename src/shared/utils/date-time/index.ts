import { DateFormatter, DateTime } from '@oleksii-pavlov/date-time'
import { DAYS_PER_WEEK } from '@/shared/constants'

export const dateFormatter = new DateFormatter()

export const formatFullDate = dateFormatter.createFormatter('DD MMMM YYYY')
export const formatFullDateWithoutYear = dateFormatter.createFormatter('DD MMMM')
export const formatMonth = dateFormatter.createFormatter('MMM YYYY')

export function formatShortWeek(date: number) {
  const firstDateOfWeek = new DateTime(date).normalizeDate()
  const lastDateOfWeek = firstDateOfWeek.getDateTimeAfter({ days: DAYS_PER_WEEK - 1 })

  const isSameMonth = firstDateOfWeek.getTimeData().months === lastDateOfWeek.getTimeData().months
  const isSameYear = firstDateOfWeek.getTimeData().years === lastDateOfWeek.getTimeData().years

  const dayFormatter = dateFormatter.createFormatter('DD')
  const daysSegment = `${dayFormatter(firstDateOfWeek.getTimeInMilliseconds())}-${dayFormatter(lastDateOfWeek.getTimeInMilliseconds())}`

  const monthFormatter = dateFormatter.createFormatter('MMM')
  const monthsSegment = isSameMonth 
    ? monthFormatter(firstDateOfWeek.getTimeInMilliseconds()) 
    : `${monthFormatter(firstDateOfWeek.getTimeInMilliseconds())}-${monthFormatter(lastDateOfWeek.getTimeInMilliseconds())}`

  const yearFormatter = dateFormatter.createFormatter('YY')
  const yearsSegment = isSameYear
    ? yearFormatter(firstDateOfWeek.getTimeInMilliseconds())
    : `${yearFormatter(firstDateOfWeek.getTimeInMilliseconds())}-${yearFormatter(lastDateOfWeek.getTimeInMilliseconds())}`

  return `${daysSegment} ${monthsSegment} ${yearsSegment}`
}
