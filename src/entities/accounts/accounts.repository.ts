import { FirebaseRepository } from '@/shared/utils/firebase'
import { AccountEntity } from './account.entity'

export const accountsRepository = new FirebaseRepository<AccountEntity>('accounts')
