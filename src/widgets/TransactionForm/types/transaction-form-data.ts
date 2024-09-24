import { TransactionClientData } from '@/features/transactions'
import { Nullable } from '@/shared/types/nullable'
import { Id } from '@/shared/types/id'

export interface TransactionFormData extends Omit<TransactionClientData, 'money'> {
  receivedCurrencyId: Nullable<Id>
  receivedAmount: number
  lostCurrencyId: Nullable<Id>
  lostAmount: number
}
