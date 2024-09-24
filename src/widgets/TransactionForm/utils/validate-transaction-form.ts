import { transactionDepositType, transactionExchangeType, transactionWithdrawType } from '@/entities/transactions'
import { createFormValidator, isNumber, isOneOf, skip } from '@oleksii-pavlov/forms'
import { TransactionFormData } from '../types/transaction-form-data'

export const validateTransactionForm = createFormValidator<TransactionFormData>({
  type: isOneOf([transactionDepositType, transactionWithdrawType, transactionExchangeType]),
  description: skip,
  receivedAmount: skip,
  receivedCurrencyId: skip,
  lostAmount: skip,
  lostCurrencyId: skip,
  date: isNumber
}, validateDepositTransactionFormData, validateWithdrawTransactionFormData, validateExchangeTransactionFormData)

function validateDepositTransactionFormData(data: TransactionFormData) {
  if (data.type !== transactionDepositType) return

  if (!data.receivedAmount || !data.receivedCurrencyId) {
    return ({
      receivedAmount: data.receivedAmount ? 'Error' : undefined,
      receivedCurrencyId: data.receivedCurrencyId ? 'Error' : undefined
    })
  }
}

function validateWithdrawTransactionFormData(data: TransactionFormData) {
  if (data.type !== transactionWithdrawType) return

  if (!data.lostCurrencyId || !data.lostCurrencyId) {
    return ({
      lostAmount: data.lostAmount ? 'Error' : undefined,
      lostCurrencyId: data.lostCurrencyId ? 'Error' : undefined
    })
  }
}

function validateExchangeTransactionFormData(data: TransactionFormData) {
  if (data.type !== transactionExchangeType) return

  if (
    !data.receivedAmount || 
    !data.receivedCurrencyId || 
    !data.lostCurrencyId || 
    !data.lostCurrencyId
  ) {
    return ({
      receivedAmount: data.receivedAmount ? 'Error' : undefined,
      receivedCurrencyId: data.receivedCurrencyId ? 'Error' : undefined,
      lostAmount: data.lostAmount ? 'Error' : undefined,
      lostCurrencyId: data.lostCurrencyId ? 'Error' : undefined,
    })
  }
}
