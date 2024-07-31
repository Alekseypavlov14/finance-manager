import { TransactionFormData } from './form'
import styles from './TransactionForm.module.css'

export type TransactionFormMode = 'create' | 'edit'

const transactionFormCreateMode: TransactionFormMode = 'create'
const transactionFormEditMode: TransactionFormMode = 'edit'

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void
  mode: TransactionFormMode
}

export function TransactionForm({ mode, onSubmit }: TransactionFormProps) {
  return (
    <div className={styles.TransactionForm}>
      {mode}
    </div>
  )
}