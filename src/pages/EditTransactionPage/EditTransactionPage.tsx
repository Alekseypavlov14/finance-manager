import { useTransactionById } from './hooks/use-transaction-by-id'
import { useNotifications } from '@/features/notifications'
import { ProtectedRoute } from '@/app/auth'
import { useNavigation } from '@/app/routing'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { Container } from '@/shared/components/Container'
import { Header } from '@/widgets/Header'
import { Page } from '@/shared/components/Page'
import styles from './EditTransactionPage.module.css'

export function EditTransactionPage() {
  const { navigateHomePage } = useNavigation()
  const { errorMessage } = useNotifications()

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

  if (!isLoading && !transaction) return (
    <ProtectedRoute>
      <Page>
        <LoaderScreen />
      </Page>
    </ProtectedRoute>
  )

  return (
    <ProtectedRoute>
      <Page className={styles.EditTransactionPage}>
        <Header />

        <Container>
          
        </Container>
      </Page>
    </ProtectedRoute>
  )
}
