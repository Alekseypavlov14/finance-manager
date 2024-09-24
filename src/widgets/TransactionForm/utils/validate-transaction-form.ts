import { createFormValidation, isOneOf, skip, multiple, isNot, isNotEmptyString, isNumber } from '@/features/forms'
import { transactionDepositType, transactionWithdrawType } from '@/entities/transactions'
import { TransactionFormData } from '../types/transaction-form-data'

export const validateTransactionForm = createFormValidation<TransactionFormData>({
  type: isOneOf([transactionDepositType, transactionWithdrawType]),
  description: skip,
  receivedAmount: multiple([isNumber, isNot(0)]),
  receivedCurrencyId: multiple([isNot(null), isNotEmptyString]),
  lostAmount: multiple([isNumber, isNot(0)]),
  lostCurrencyId: multiple([isNumber, isNot(0)]),
  date: isNumber
})
