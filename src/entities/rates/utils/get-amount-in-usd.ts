import { RateEntity } from '../rate.entity'

export function getAmountInUSD(amount: number, currencyCode: string, rates: RateEntity[]) {
  const rate = rates.find(rate => rate.currencyCode === currencyCode)
  if (!rate || !rate.rateToUSD) return 0

  const amountInUSD = amount / rate.rateToUSD

  return amountInUSD
}
