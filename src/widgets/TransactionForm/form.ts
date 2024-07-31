import { transactionDepositType, TransactionMoney, TransactionType, transactionWithdrawType } from '@/entities/transactions'
import { createFormValidation, isNot, isNotEmptyString, isNumber, isOneOf, multiple, skip } from '@/features/forms'
import { TransactionClientData } from '@/features/transactions'
import { Option } from '@/shared/types/option'

export interface TransactionFormData extends Omit<TransactionClientData, 'money'>, TransactionMoney {}

export const initialValues: TransactionFormData = {
  type: transactionWithdrawType,
  description: '',
  amount: 0,
  currencyId: null,
  date: Date.now(),
}

export const transactionTypesOptions: Option<TransactionType>[] = [
  { label: 'Withdraw', value: transactionWithdrawType },
  { label: 'Deposit', value: transactionDepositType },
]

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
