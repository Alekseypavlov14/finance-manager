import { TransactionEntity } from '@/entities/transactions'
import { TransactionCard } from '../TransactionCard'
import { useCurrencies } from '@/entities/currency'
import { findById } from '@/shared/utils/entities'
import { Nullable } from '@/shared/types/nullable'
import { Id } from '@/shared/types/id'
import styles from './TransactionList.module.css'

interface TransactionListProps {
  transactions: TransactionEntity[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  const currencies = useCurrencies()

  function getCurrencyLabel(currencyId: Nullable<Id>) {
    return currencies.find(findById(currencyId ?? ''))?.label ?? ''
  }

  return (
    <div className={styles.TransactionList}>
      {transactions.map(transaction => (
        <TransactionCard
          type={transaction.type}
          amount={transaction.money.amount}
          currency={getCurrencyLabel(transaction.money.currencyId)}
          description={transaction.description}
          date={transaction.date}
          key={transaction.id}
        />
      ))}
    </div>
  )
}