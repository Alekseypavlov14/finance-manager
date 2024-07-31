import { CURRENCIES_CACHE_TIMEOUT } from '@/shared/constants'
import { currenciesRepository } from './currencies.repository'
import { CurrencyEntity } from './currency.entity'
import { Cache } from '@oleksii-pavlov/storages'

export class CurrenciesStorage {
  private readonly cache = new Cache<CurrencyEntity[]>('currencies', CURRENCIES_CACHE_TIMEOUT)

  async getValue(): Promise<CurrencyEntity[]> {
    const cachedValue = this.cache.getValue()
    if (cachedValue) return cachedValue

    const currencies = await currenciesRepository.get().catch(() => [])
    this.cache.setValue(currencies)

    return currencies
  }
}

export const currenciesStorage = new CurrenciesStorage()
