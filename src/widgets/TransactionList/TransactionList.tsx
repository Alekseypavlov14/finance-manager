import { transactionGroupTypeNone } from './constants'
import { getGroupedTransactions } from './utils/get-grouped-transactions'
import { TransactionGroupType } from './types/transaction-group-type'
import { TransactionEntity } from '@/entities/transactions'
import { TransactionCard } from '../TransactionCard'
import { useCurrencies } from '@/entities/currency'
import { Headline } from '@/shared/components/Headline'
import { findById } from '@/shared/utils/entities'
import { Nullable } from '@/shared/types/nullable'
import { Id } from '@/shared/types/id'
import styles from './TransactionList.module.css'

interface TransactionListProps {
  transactions: TransactionEntity[]
  groupingType?: TransactionGroupType
}

export function TransactionList({ 
  transactions, 
  groupingType = transactionGroupTypeNone 
}: TransactionListProps) {
  const currencies = useCurrencies()

  function getCurrencyLabel(currencyId: Nullable<Id>) {
    return currencies.find(findById(currencyId ?? ''))?.label ?? ''
  }

  const transactionGroups = getGroupedTransactions(transactions, groupingType)

  return (
    <div className={styles.TransactionList}>
      {transactionGroups.map((group, index) => (
        <div
          className={styles.TransactionsGroup}
          key={index}
        >
          <Headline 
            className={styles.TransactionsGroupLabel}
            level={5}
          >
            {group.label}
          </Headline>

          <div className={styles.TransactionsGroupContent}>
            {group.transactions.map(transaction => (
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
        </div>
      ))}
    </div>
  )
}