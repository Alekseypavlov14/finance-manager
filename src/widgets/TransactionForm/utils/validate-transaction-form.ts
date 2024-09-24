import { createFormValidation, isOneOf, skip, multiple, isNot, isNotEmptyString, isNumber } from '@/features/forms'
import { transactionDepositType, transactionExchangeType, transactionWithdrawType } from '@/entities/transactions'
import { TransactionFormData } from '../types/transaction-form-data'

export const validateTransactionForm = createFormValidation<TransactionFormData>({
  type: isOneOf([transactionDepositType, transactionWithdrawType, transactionExchangeType]),
  description: skip,
  receivedAmount: multiple([isNumber, isNot(0)]),
  receivedCurrencyId: multiple([isNot(null), isNotEmptyString]),
  lostAmount: multiple([isNumber, isNot(0)]),
  lostCurrencyId: multiple([isNot(null), isNotEmptyString]),
  date: isNumber
})
