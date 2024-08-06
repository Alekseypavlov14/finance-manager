import { formatAsMoney, transactionDepositType, TransactionType, transactionWithdrawType } from '@/entities/transactions'
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
  onClick?: () => void
}

export function TransactionCard({
  type,
  amount,
  currency,
  description,
  date,
  onClick,
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
    <div 
      className={clsx(styles.TransactionCard, transactionModifierClass)}
      onClick={onClick}
    >
      <div className={styles.TransactionHeader}>
        <div className={styles.TransactionMoney}>
          {transactionSign}{formatAsMoney(amount)} {currency}
        </div>

        <div className={styles.TransactionDate}>
          {formatFullDateWithoutYear(date)}
        </div>
      </div>

      <TextPreview text={description} />
    </div>
  )
}