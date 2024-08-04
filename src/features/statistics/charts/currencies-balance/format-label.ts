import { CurrenciesBalanceEntry } from './data-type'
import { USD_CURRENCY_CODE } from '@/entities/rates'
import { formatAsMoney } from '@/entities/transactions'

export function formatCurrenciesBalanceLabel(entry: CurrenciesBalanceEntry) {
  const currencyInUSDSection = entry.currency !== USD_CURRENCY_CODE
    ? ` - ${formatAsMoney(entry.amountInUSD)} ${USD_CURRENCY_CODE}`
    : ``
  
  return `${entry.currency} (${formatAsMoney(entry.amount)} ${entry.currency}${currencyInUSDSection})`
}
