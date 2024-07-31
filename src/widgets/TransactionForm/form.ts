import { transactionDepositType, TransactionMoney, transactionWithdrawType } from '@/entities/transactions'
import { createFormValidation, isNot, isNotEmptyString, isNumber, isOneOf, multiple, skip } from '@/features/forms'
import { TransactionClientData } from '@/features/transactions'

export interface TransactionFormData extends Omit<TransactionClientData, 'money'>, TransactionMoney {}

export const initialValues: TransactionFormData = {
  type: transactionWithdrawType,
  description: '',
  amount: 0,
  currencyId: null,
  date: Date.now(),
}

export function mapTransactionFormDataToClientData(formData: TransactionFormData): TransactionClientData {
  return ({
    type: formData.type,
    description: formData.description,
    date: formData.date,
    money: {
      amount: formData.amount,
      currencyId: formData.currencyId,
    }
  })
}

export const validateTransactionForm = createFormValidation<TransactionFormData>({
  type: isOneOf([transactionDepositType, transactionWithdrawType]),
  description: skip,
  amount: multiple([isNumber, isNot(0)]),
  currencyId: multiple([isNot(null), isNotEmptyString]),
  date: isNumber
})
