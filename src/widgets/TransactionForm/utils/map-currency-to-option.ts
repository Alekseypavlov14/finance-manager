import { CurrencyOption } from '../types/currency-option'
import { CurrencyEntity } from '@/entities/currency'

export function mapCurrencyToOption(currency: CurrencyEntity): CurrencyOption {
  return ({
    label: currency.label,
    value: currency.id
  })
}
