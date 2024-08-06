import { getAmountInUSD, RateEntity } from '@/entities/rates'
import { TransactionEntity } from '@/entities/transactions'
import { CurrencyEntity } from '@/entities/currency'

export function getTransactionAmountInUSD(transaction: TransactionEntity, currencies: CurrencyEntity[], rates: RateEntity[]) {
  const currency = currencies.find(currency => currency.id === transaction.money.currencyId)
  if (!currency) return 0

  return getAmountInUSD(transaction.money.amount, currency.label, rates)
}
