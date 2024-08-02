import { DateFormatter } from '@oleksii-pavlov/date-time'

export const dateFormatter = new DateFormatter()

export const formatFullDate = dateFormatter.createFormatter('DD MMMM YYYY')
export const formatFullDateWithoutYear = dateFormatter.createFormatter('DD MMMM')
export const formatMonth = dateFormatter.createFormatter('MMM YYYY')
