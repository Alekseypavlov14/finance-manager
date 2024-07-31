import { TransactionForm, transactionFormCreateMode } from '@/widgets/TransactionForm'
import { createTransaction } from '@/features/transactions'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
import { Container } from '@/shared/components/Container'
import { Page } from '@/shared/components/Page'
import styles from './CreateTransactionPage.module.css'

export function CreateTransactionPage() {
  return (
    <ProtectedRoute>
      <Page className={styles.CreateTransactionPage}>
        <StructureLayout>
          <Container>
            <TransactionForm 
              mode={transactionFormCreateMode}
              onSubmit={createTransaction}
            />
          </Container>
        </StructureLayout>
      </Page>
    </ProtectedRoute>
  )
}