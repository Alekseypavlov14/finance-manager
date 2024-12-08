import { getAmountInUSD, RateEntity } from '@/entities/rates'
import { CurrencyEntity } from '@/entities/currency'
import { Id } from '@/shared/types/id'

export function getTransactionAmountInUSDByCurrencyId(amount: number, currencyId: Id, currencies: CurrencyEntity[], rates: RateEntity[]) {
  const currency = currencies.find(currency => currency.id === currencyId)
  if (!currency) return 0

  return getAmountInUSD(amount, currency.label, rates)
}
