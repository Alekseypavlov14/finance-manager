import { getWeekGroupLabelByIndex } from './utils/get-week-group-label-by-index'
import { getTransactionWeekIndex } from './utils/get-transaction-week-index'
import { TransactionGroupType } from './types/transaction-group-type'
import { TransactionEntity } from '@/entities/transactions'

export const transactionGroupTypeWeeks: TransactionGroupType = 'weeks'
export const transactionGroupTypeNone: TransactionGroupType = 'none'

export const mapGroupingTypeToLabelRenderer: Record<TransactionGroupType, (index: number) => string> = {
  [transactionGroupTypeWeeks]: getWeekGroupLabelByIndex,
  [transactionGroupTypeNone]: () => 'All Transactions'
}

export const mapGroupingTypeToIndexGetter: Record<TransactionGroupType, (transaction: TransactionEntity) => number> = {
  [transactionGroupTypeWeeks]: getTransactionWeekIndex,
  [transactionGroupTypeNone]: () => 0
}