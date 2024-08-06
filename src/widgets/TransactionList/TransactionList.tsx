import { formatAsMoney, TransactionEntity } from '@/entities/transactions'
import { transactionGroupTypeNone } from './constants'
import { getGroupedTransactions } from './utils/get-grouped-transactions'
import { TransactionGroupType } from './types/transaction-group-type'
import { USD_CURRENCY_CODE } from '@/entities/rates'
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
          <div className={styles.TransactionsGroupHeader}>
            <Headline 
              className={styles.TransactionsGroupLabel}
              level={5}
            >
              {group.label}
            </Headline>

            <Headline
              className={styles.TransactionsGroupStatistics}
              level={5}
            >
              <div className={styles.TransactionGroupIncomes}>+{formatAsMoney(group.incomes)} {USD_CURRENCY_CODE}</div>
              <div className={styles.TransactionGroupExpenses}>-{formatAsMoney(group.expenses)} {USD_CURRENCY_CODE}</div>
            </Headline>
          </div>

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