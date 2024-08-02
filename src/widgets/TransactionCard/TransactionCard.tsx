import { transactionDepositType, TransactionType, transactionWithdrawType } from '@/entities/transactions'
import { formatFullDateWithoutYear } from '@/shared/utils/date-time'
import { TextPreview } from '@/shared/components/TextPreview'
import styles from './TransactionCard.module.css'
import clsx from 'clsx'

interface TransactionCardProps {
  type: TransactionType
  amount: number
  currency: string
  description: string
  date: number
}

export function TransactionCard({
  type,
  amount,
  currency,
  description,
  date,
}: TransactionCardProps) {
  const transactionSign = {
    [transactionDepositType]: '+',
    [transactionWithdrawType]: '-',
  }[type]

  const transactionModifierClass = {
    [transactionDepositType]: styles.Deposit,
    [transactionWithdrawType]: styles.Withdraw,
  }[type]

  return (
    <div className={clsx(styles.TransactionCard, transactionModifierClass)}>
      <div className={styles.TransactionHeader}>
        <div className={styles.TransactionMoney}>
          {transactionSign}{amount.toFixed(2)} {currency}
        </div>

        <div className={styles.TransactionDate}>
          {formatFullDateWithoutYear(date)}
        </div>
      </div>

      <TextPreview text={description} />
    </div>
  )
}