import { mapTransactionToFormData, TransactionForm, transactionFormEditMode } from '@/widgets/TransactionForm'
import { editTransaction, TransactionClientData } from '@/features/transactions'
import { handleHTTPException } from '@/shared/utils/exception'
import { useTransactionById } from './hooks/use-transaction-by-id'
import { useNotifications } from '@/features/notifications'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { ProtectedRoute } from '@/app/auth'
import { useNavigation } from '@/app/routing'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { ErrorScreen } from '@/widgets/ErrorScreen'
import { Container } from '@/shared/components/Container'
import { Header } from '@/widgets/Header'
import { Page } from '@/shared/components/Page'
import styles from './EditTransactionPage.module.css'

export function EditTransactionPage() {
  const { navigateHomePage, navigateTransactionsPage } = useNavigation()
  const { successMessage, errorMessage } = useNotifications()

  function handleError() {
    navigateHomePage()
    errorMessage('This transaction is not found')
  }

  const { transaction, isLoading } = useTransactionById(handleError)

  if (isLoading) return (
    <ProtectedRoute>
      <Page>
        <LoaderScreen />
      </Page>
    </ProtectedRoute>
  )

  if (!transaction) return (
    <ProtectedRoute>
      <Page>
        <ErrorScreen>
          This transaction is not found
        </ErrorScreen>
      </Page>
    </ProtectedRoute>
  )

  function submitHandler(transactionClientData: TransactionClientData) {
    if (!transaction) return

    return editTransaction(transaction.id, transactionClientData)
      .then(navigateTransactionsPage)
      .then(() => successMessage('Transaction is edited!'))
      .catch(handleHTTPException({
        500: () => errorMessage('Something went wrong, try later'),
        [defaultHandler]: () => errorMessage('Something went wrong, try later'),
      }))
  }

  return (
    <ProtectedRoute>
      <Page className={styles.EditTransactionPage}>
        <Header />

        <Container>
          <TransactionForm 
            mode={transactionFormEditMode}
            initialValue={mapTransactionToFormData(transaction)}
            onSubmit={submitHandler}
          />
        </Container>
      </Page>
    </ProtectedRoute>
  )
}
