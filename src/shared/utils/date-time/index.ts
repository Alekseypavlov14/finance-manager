import { DateFormatter } from '@oleksii-pavlov/date-time'

export const dateFormatter = new DateFormatter()

export const formatFullDate = dateFormatter.createFormatter('DD MMM YYYY')