import { EntityStorage } from '@/shared/utils/entity-storage'
import { AccountEntity } from './account.entity'

export const accountsStorage = new EntityStorage<AccountEntity>('accounts', () => [])
