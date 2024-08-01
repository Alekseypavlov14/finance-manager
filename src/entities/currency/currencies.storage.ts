import { CURRENCIES_CACHE_TIMEOUT } from '@/shared/constants'
import { currenciesRepository } from './currencies.repository'
import { CurrencyEntity } from './currency.entity'
import { Cache } from '@oleksii-pavlov/storages'

export class CurrenciesStorage {
  private readonly cache = new Cache<CurrencyEntity[]>('currencies', CURRENCIES_CACHE_TIMEOUT)

  async getValue(): Promise<CurrencyEntity[]> {
    const cachedValue = this.cache.getValue()
    if (cachedValue) return this.sort(cachedValue)

    const currencies = await currenciesRepository.get().catch(() => [])
    this.cache.setValue(this.sort(currencies))

    return this.sort(currencies)
  }

  private sort(items: CurrencyEntity[]): CurrencyEntity[] {
    return items.map(_ => _).sort((item1, item2) => item1.label.localeCompare(item2.label))
  }
}

export const currenciesStorage = new CurrenciesStorage()
