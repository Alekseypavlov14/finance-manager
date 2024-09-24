import { transactionDepositType, transactionExchangeType, transactionWithdrawType } from '@/entities/transactions'
import { TransactionTypeOption } from './types/transaction-type-option'
import { TransactionFormData } from './types/transaction-form-data'

export const defaultInitialValues: TransactionFormData = {
  type: transactionWithdrawType,
  description: '',
  receivedAmount: 0,
  lostCurrencyId: null,
  lostAmount: 0,
  receivedCurrencyId: null,
  date: Date.now(),
}

export const transactionTypesOptions: TransactionTypeOption[] = [
  { label: 'Withdraw', value: transactionWithdrawType },
  { label: 'Deposit', value: transactionDepositType },
  { label: 'Exchange', value: transactionExchangeType }
]
