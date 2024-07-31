import { useEffect, useState } from 'react'
import { mapCurrencyToOption } from '../utils/map-currency-to-option'
import { CurrencyOption } from '../types/currency-option'
import { useCurrencies } from '@/entities/currency'

export function useCurrencyOptions(): CurrencyOption[] {
  const [currencyOptions, setCurrencyOptions] = useState<CurrencyOption[]>([])
  const currencies = useCurrencies()

  useEffect(() => {
    setCurrencyOptions(currencies.map(mapCurrencyToOption))
  }, [currencies])

  return currencyOptions
}
