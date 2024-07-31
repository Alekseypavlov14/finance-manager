import { CurrencyEntity, CurrencyEntityDTO } from './currency.entity'
import { FirebaseRepository } from '@/shared/utils/firebase'

export const currenciesRepository = new FirebaseRepository<CurrencyEntity, CurrencyEntityDTO>('currencies')
