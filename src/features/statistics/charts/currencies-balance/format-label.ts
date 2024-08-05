import { USD_CURRENCY_CODE } from '@/entities/rates'
import { formatAsMoney } from '@/entities/transactions'

export function formatCurrenciesBalanceLabel(amount: number, currency: string, amountInUSD: number) {
  const currencyInUSDSection = currency !== USD_CURRENCY_CODE
    ? ` - ${formatAsMoney(amountInUSD)} ${USD_CURRENCY_CODE}`
    : ``
  
  return `${currency} (${formatAsMoney(amount)} ${currency}${currencyInUSDSection})`
}
