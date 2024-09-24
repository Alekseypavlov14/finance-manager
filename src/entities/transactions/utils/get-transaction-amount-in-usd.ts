import { isTransactionTypeReceiving, TransactionEntity } from '@/entities/transactions'
import { getAmountInUSD, RateEntity } from '@/entities/rates'
import { CurrencyEntity } from '@/entities/currency'

export function getTransactionAmountInUSD(transaction: TransactionEntity, currencies: CurrencyEntity[], rates: RateEntity[]) {
  const currencyId = isTransactionTypeReceiving(transaction.type) ? transaction.money.received.currencyId : transaction.money.lost.currencyId
  const amount = isTransactionTypeReceiving(transaction.type) ? transaction.money.received.amount : transaction.money.lost.amount

  const currency = currencies.find(currency => currency.id === currencyId)
  if (!currency) return 0

  return getAmountInUSD(amount, currency.label, rates)
}
