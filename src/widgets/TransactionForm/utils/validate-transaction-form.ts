import { createFormValidation, isOneOf, skip, multiple, isNot, isNotEmptyString, isNumber } from '@/features/forms'
import { transactionDepositType, transactionWithdrawType } from '@/entities/transactions'
import { TransactionFormData } from '../types/transaction-form-data'

export const validateTransactionForm = createFormValidation<TransactionFormData>({
  type: isOneOf([transactionDepositType, transactionWithdrawType]),
  description: skip,
  amount: multiple([isNumber, isNot(0)]),
  currencyId: multiple([isNot(null), isNotEmptyString]),
  date: isNumber
})
