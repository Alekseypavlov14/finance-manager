import { TransactionEntity, transactionWithdrawType } from '@/entities/transactions'

export interface TransactionFormData extends Omit<TransactionEntity, 'id'> {}

export const initialValues: TransactionFormData = {
  type: transactionWithdrawType,
  description: '',
  money: {
    amount: 0,
    currencyId: null
  },
  userId: null,
  date: Date.now(),
}
