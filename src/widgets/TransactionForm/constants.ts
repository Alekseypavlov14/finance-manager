import { transactionDepositType, transactionWithdrawType } from '@/entities/transactions'
import { TransactionTypeOption } from './types/transaction-type-option'
import { TransactionFormData } from './types/transaction-form-data'

export const initialValues: TransactionFormData = {
  type: transactionWithdrawType,
  description: '',
  amount: 0,
  currencyId: null,
  date: Date.now(),
}

export const transactionTypesOptions: TransactionTypeOption[] = [
  { label: 'Withdraw', value: transactionWithdrawType },
  { label: 'Deposit', value: transactionDepositType },
]
