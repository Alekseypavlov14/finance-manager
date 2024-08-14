import { getRateByCurrencyCodes } from './utils/get-rate-by-currency-codes'
import { DAY_IN_MILLISECONDS } from '@/shared/constants'
import { USD_CURRENCY_CODE } from './constants'
import { CollectionCache } from '@oleksii-pavlov/storages'
import { RateEntity } from './rate.entity'

export class RatesStorage {
  private readonly cache = new CollectionCache<RateEntity, string>({
    key: 'rates',
    timeout: DAY_IN_MILLISECONDS,
    selector: rate => rate.currencyCode
  })

  async getRates(currencyCodes: string[]): Promise<RateEntity[]> {
    const rates = await Promise.all(currencyCodes.map<Promise<RateEntity>>(async code => {
      const cachedRate = this.cache.getValueById(code)
      if (cachedRate) return cachedRate

      this.cache.removeValueById(code)

      const rate: RateEntity = {
        currencyCode: code,
        rateToUSD: await this.getRateByCurrencyCode(code)
      }

      this.cache.addValue(rate)

      return rate
    }))

    return rates
  }

  private async getRateByCurrencyCode(currencyCode: string): Promise<number> {
    const rate = await getRateByCurrencyCodes(USD_CURRENCY_CODE, currencyCode)

    return rate
  }
}

export const ratesStorage = new RatesStorage()
