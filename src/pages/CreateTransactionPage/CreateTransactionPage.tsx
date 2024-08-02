import { TransactionForm, transactionFormCreateMode } from '@/widgets/TransactionForm'
import { createTransaction, TransactionClientData } from '@/features/transactions'
import { handleHTTPException } from '@/shared/utils/exception'
import { useNotifications } from '@/features/notifications'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { useNavigation } from '@/app/routing'
import { Container } from '@/shared/components/Container'
import { Page } from '@/shared/components/Page'
import styles from './CreateTransactionPage.module.css'

export function CreateTransactionPage() {
  const { successMessage, errorMessage } = useNotifications()
  const { navigateTransactionsPage } = useNavigation()

  function submitHandler(transactionClientData: TransactionClientData) {
    return createTransaction(transactionClientData)
      .then(navigateTransactionsPage)
      .then(() => successMessage('Transaction is created!'))
      .catch(handleHTTPException({
        401: () => errorMessage('You are not authorized'),
        500: () => errorMessage('Something went wrong, try later'),
        [defaultHandler]: () => errorMessage('Something went wrong, try later'),
      }))
  }

  return (
    <ProtectedRoute>
      <Page className={styles.CreateTransactionPage}>
        <StructureLayout>
          <Container>
            <TransactionForm 
              mode={transactionFormCreateMode}
              onSubmit={submitHandler}
            />
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}