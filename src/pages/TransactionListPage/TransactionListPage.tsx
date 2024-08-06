import { sortTransactionsByDescendingDate, useAccountTransactions } from '@/entities/transactions'
import { transactionGroupTypeWeeks, TransactionList } from '@/widgets/TransactionList'
import { NoTransactionsScreen } from '@/widgets/NoTransactionsScreen'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { useNavigation } from '@/app/routing'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { Container } from '@/shared/components/Container'
import { Page } from '@/shared/components/Page'
import styles from './TransactionListPage.module.css'

export function TransactionListPage() {
  const { transactions, isLoading } = useAccountTransactions()
  const { navigateEditTransactionPage } = useNavigation()

  const sortedTransactions = sortTransactionsByDescendingDate(transactions)

  return (
    <ProtectedRoute>
      <Page className={styles.TransactionListPage}>
        <StructureLayout>
          <Container fullHeight>
            {isLoading && <LoaderScreen />}
            {!isLoading && !transactions.length && <NoTransactionsScreen />}

            {!isLoading && transactions.length && (
              <TransactionList 
                transactions={sortedTransactions} 
                groupingType={transactionGroupTypeWeeks}
                onClickTransaction={transaction => () => navigateEditTransactionPage(transaction.id)}
              />
            )}
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}