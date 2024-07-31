import { TransactionClientData } from '@/features/transactions'
import { TransactionFormData } from '../types/transaction-form-data'

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
