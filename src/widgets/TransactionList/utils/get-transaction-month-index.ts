import { TransactionEntity } from '@/entities/transactions'
import { MONTHS_PER_YEAR } from '@/shared/constants'
import { DateTime } from '@oleksii-pavlov/date-time'

export function getTransactionMonthIndex(transaction: TransactionEntity): number {
  const today = new DateTime().normalizeDate()
  const transactionDate = new DateTime(transaction.date)

  const todayMonthIndex = today.getTimeData().months
  const transactionMonthIndex = transactionDate.getTimeData().months

  const yearsDifference = today.getTimeData().years - transactionDate.getTimeData().years

  const index = todayMonthIndex - transactionMonthIndex + yearsDifference * MONTHS_PER_YEAR

  return index
}
