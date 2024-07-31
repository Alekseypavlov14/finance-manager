import { TransactionClientData } from '@/features/transactions'
import { TransactionMoney } from '@/entities/transactions'

export interface TransactionFormData extends Omit<TransactionClientData, 'money'>, TransactionMoney {}
