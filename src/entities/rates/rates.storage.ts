import { getRateByCurrencyCodes } from './utils/get-rate-by-currency-codes'
import { USD_CURRENCY_CODE } from './constants'
import { RateEntity } from './rate.entity'

export class RatesStorage {
  async getRates(currencyCodes: string[]): Promise<RateEntity[]> {
    const rates = await Promise.all(currencyCodes.map<Promise<RateEntity>>(async code => ({
      currencyCode: code,
      rateToUSD: await this.getRateByCurrencyCode(code)
    })))

    return rates
  }

  async getRate(currencyCode: string): Promise<RateEntity> {
    const rateValue = await this.getRateByCurrencyCode(currencyCode)

    const rate: RateEntity = { currencyCode, rateToUSD: rateValue }

    return rate
  }

  private async getRateByCurrencyCode(currencyCode: string): Promise<number> {
    const rate = await getRateByCurrencyCodes(USD_CURRENCY_CODE, currencyCode)

    return rate
  }
}

export const ratesStorage = new RatesStorage()
