import { useEffect, useState } from 'react'
import { currenciesStorage } from '../currencies.storage'
import { CurrencyEntity } from '../currency.entity'

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<CurrencyEntity[]>([])

  useEffect(() => {
    currenciesStorage.getValue().then(setCurrencies)
  }, [])

  return currencies
}