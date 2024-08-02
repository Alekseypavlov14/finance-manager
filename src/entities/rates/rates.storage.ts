import { getRateByCurrencyCodes } from './utils/get-rate-by-currency-codes'
import { RATES_CACHE_TIMEOUT } from '@/shared/constants'
import { USD_CURRENCY_CODE } from './constants'
import { RateEntity } from './rate.entity'
import { Cache } from '@oleksii-pavlov/storages'

export class RatesStorage {
  private readonly cache = new Cache<RateEntity[]>('rates', RATES_CACHE_TIMEOUT, [])

  async getRates(currencyCodes: string[]): Promise<RateEntity[]> {
    const rates = await Promise.all(currencyCodes.map<Promise<RateEntity>>(async code => ({
      currencyCode: code,
      rateToUSD: await this.getRateByCurrencyCode(code)
    })))

    await this.cacheRatesValue(rates)

    return rates
  }

  async getRate(currencyCode: string): Promise<RateEntity> {
    const rateValue = await getRateByCurrencyCodes(USD_CURRENCY_CODE, currencyCode)

    const rate: RateEntity = { currencyCode, rateToUSD: rateValue }

    await this.cacheRatesValue([rate])

    return rate
  }

  private async getRateByCurrencyCode(currencyCode: string): Promise<number> {
    const rates = this.cache.getValue() ?? []
    if (currencyCode === USD_CURRENCY_CODE) return 1

    const cachedRate = rates.find(rate => rate.currencyCode === currencyCode)
    if (cachedRate) return cachedRate.rateToUSD

    const rate = await getRateByCurrencyCodes(USD_CURRENCY_CODE, currencyCode)

    return rate
  }

  private async cacheRatesValue(rates: RateEntity[]) {
    const cachedRates = this.cache.getValue() ?? []
    const cachedRatesWithNewRate = Array.from(new Set(cachedRates.concat(rates)))

    const revalidatedRates = await Promise.all(cachedRatesWithNewRate.map<Promise<RateEntity>>(async rate => {
      const rateValue = await getRateByCurrencyCodes(USD_CURRENCY_CODE, rate.currencyCode)

      return ({
        currencyCode: rate.currencyCode,
        rateToUSD: rateValue
      })
    }))

    this.cache.setValue(revalidatedRates)
  }
}

export const ratesStorage = new RatesStorage()
