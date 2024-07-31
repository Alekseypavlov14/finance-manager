import { TransactionForm, transactionFormCreateMode } from '@/widgets/TransactionForm'
import { createTransaction } from '@/features/transactions'
import { Page } from '@/shared/components/Page'
import styles from './CreateTransactionPage.module.css'

export function CreateTransactionPage() {
  return (
    <Page className={styles.CreateTransactionPage}>
      <TransactionForm 
        mode={transactionFormCreateMode}
        onSubmit={createTransaction}
      />
    </Page>
  )
}