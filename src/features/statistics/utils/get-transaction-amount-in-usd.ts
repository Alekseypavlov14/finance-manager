import { TransactionEntity } from '@/entities/transactions'
import { CurrencyEntity } from '@/entities/currency'
import { RateEntity } from '@/entities/rates'

export function getTransactionAmountInUSD(transaction: TransactionEntity, currencies: CurrencyEntity[], rates: RateEntity[]) {
  const currency = currencies.find(currency => currency.id === transaction.money.currencyId)
  if (!currency) return 0

  const rate = rates.find(rate => rate.currencyCode === currency.label)
  if (!rate || !rate.rateToUSD) return 0

  const transactionAmountInUSD = transaction.money.amount / rate.rateToUSD

  return transactionAmountInUSD
}
