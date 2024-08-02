import { sortTransactionsByDescendingDate, useAccountTransactions } from '@/entities/transactions'
import { TransactionList } from '@/widgets/TransactionList'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { Container } from '@/shared/components/Container'
import { Page } from '@/shared/components/Page'
import styles from './TransactionListPage.module.css'

export function TransactionListPage() {
  const { transactions, isLoading } = useAccountTransactions()
  
  const sortedTransactions = sortTransactionsByDescendingDate(transactions)

  return (
    <ProtectedRoute>
      <Page className={styles.TransactionListPage}>
        <StructureLayout>
          <Container fullHeight>
            {isLoading && <LoaderScreen />}

            <TransactionList transactions={sortedTransactions} />
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}