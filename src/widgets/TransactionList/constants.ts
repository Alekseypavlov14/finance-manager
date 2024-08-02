import { getMonthGroupLabelByIndex } from './utils/get-month-group-label-by-index'
import { getWeekGroupLabelByIndex } from './utils/get-week-group-label-by-index'
import { getTransactionMonthIndex } from './utils/get-transaction-month-index'
import { getTransactionWeekIndex } from './utils/get-transaction-week-index'
import { TransactionGroupType } from './types/transaction-group-type'
import { TransactionEntity } from '@/entities/transactions'

export const transactionGroupTypeWeeks: TransactionGroupType = 'weeks'
export const transactionGroupTypeMonths: TransactionGroupType = 'months'
export const transactionGroupTypeNone: TransactionGroupType = 'none'

export const mapGroupingTypeToLabelRenderer: Record<TransactionGroupType, (index: number) => string> = {
  [transactionGroupTypeWeeks]: getWeekGroupLabelByIndex,
  [transactionGroupTypeMonths]: getMonthGroupLabelByIndex,
  [transactionGroupTypeNone]: () => 'All Transactions'
}

export const mapGroupingTypeToIndexGetter: Record<TransactionGroupType, (transaction: TransactionEntity) => number> = {
  [transactionGroupTypeWeeks]: getTransactionWeekIndex,
  [transactionGroupTypeMonths]: getTransactionMonthIndex,
  [transactionGroupTypeNone]: () => 0
}
