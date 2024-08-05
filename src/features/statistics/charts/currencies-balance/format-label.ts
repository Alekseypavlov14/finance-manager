import { CurrenciesBalanceEntry } from './data-type'
import { USD_CURRENCY_CODE } from '@/entities/rates'
import { formatAsMoney } from '@/entities/transactions'

export function formatCurrenciesBalanceLabel(entry: CurrenciesBalanceEntry) {
  const currencyInUSDSection = entry.label !== USD_CURRENCY_CODE
    ? ` - ${formatAsMoney(entry.value)} ${USD_CURRENCY_CODE}`
    : ``
  
  return `${entry.label} (${formatAsMoney(entry.amount)} ${entry.label}${currencyInUSDSection})`
}
