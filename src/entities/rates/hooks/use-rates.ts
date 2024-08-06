import { useEffect, useState } from 'react'
import { useCurrencies } from '@/entities/currency'
import { ratesStorage } from '../rates.storage'
import { RateEntity } from '../rate.entity'

export interface UseRatesResult {
  isLoading: boolean
  rates: RateEntity[]
}

export function useRates(): UseRatesResult {
  const [rates, setRates] = useState<RateEntity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { currencies } = useCurrencies()

  function stopLoading() {
    setIsLoading(false)
  }

  useEffect(() => {
    setIsLoading(true)

    ratesStorage.getRates(currencies.map(currency => currency.label))
      .then(setRates)
      .then(stopLoading)

  }, [currencies])

  return { isLoading, rates }
}
