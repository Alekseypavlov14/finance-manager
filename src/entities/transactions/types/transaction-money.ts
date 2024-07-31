import { Nullable } from '@/shared/types/nullable'
import { Id } from '@/shared/types/id'

export interface TransactionMoney {
  currencyId: Nullable<Id>
  amount: number
}
