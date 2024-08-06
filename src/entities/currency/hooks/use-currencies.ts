import { useEffect, useState } from 'react'
import { currenciesStorage } from '../currencies.storage'
import { CurrencyEntity } from '../currency.entity'

export interface GetCurrenciesResult {
  currencies: CurrencyEntity[]
  isLoading: boolean
}

export function useCurrencies(): GetCurrenciesResult {
  const [currencies, setCurrencies] = useState<CurrencyEntity[]>([])
  const [isLoading, setLoading] = useState(true)

  function stopLoading() {
    setLoading(false)
  }

  useEffect(() => {
    currenciesStorage.getValue()
      .then(setCurrencies)
      .then(stopLoading)
  }, [])

  return { currencies, isLoading }
}