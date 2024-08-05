import { otherCurrenciesGroupMaxRenderCurrenciesAmount } from '../constants'

export function getOtherCurrenciesLabel(currencies: string[]) {
  const currenciesSection = currencies.length > 0
    ? currencies.length > otherCurrenciesGroupMaxRenderCurrenciesAmount
      ? ` (${currencies.slice(0, otherCurrenciesGroupMaxRenderCurrenciesAmount).join(', ')} and more)`
      : ` (${currencies.join(', ')})`
    : ''

  return `Others${currenciesSection}`
}
