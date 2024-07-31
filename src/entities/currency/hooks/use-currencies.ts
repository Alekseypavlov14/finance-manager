import { currenciesStorage } from '../currencies.storage'
import { CurrencyEntity } from '../currency.entity'
import { useEffect, useState } from 'react'

export function useCurrencies() {
  const [currencies, setCurrencies] = useState<CurrencyEntity[]>([])

  useEffect(() => {
    currenciesStorage.getValue().then(setCurrencies)
  }, [])

  return currencies
}