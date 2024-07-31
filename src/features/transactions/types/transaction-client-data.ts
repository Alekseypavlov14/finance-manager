import { TransactionEntityDTO } from '@/entities/transactions'

export interface TransactionClientData extends Omit<TransactionEntityDTO, 'userId'> {}
