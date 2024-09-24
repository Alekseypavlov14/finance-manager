import { formatAsMoney, transactionDepositType, transactionExchangeType, TransactionType, transactionWithdrawType } from '@/entities/transactions'
import { formatFullDateWithoutYear } from '@/shared/utils/date-time'
import { TextPreview } from '@/shared/components/TextPreview'
import styles from './TransactionCard.module.css'
import clsx from 'clsx'

interface TransactionCardProps {
  type: TransactionType
  receivedCurrency: string
  receivedAmount: number
  lostCurrency: string
  lostAmount: number
  description: string
  date: number
  onClick?: () => void
}

export function TransactionCard({
  type,
  receivedCurrency,
  receivedAmount,
  lostCurrency,
  lostAmount,
  description,
  date,
  onClick,
}: TransactionCardProps) {
  const transactionSign = {
    [transactionDepositType]: '+',
    [transactionWithdrawType]: '-',
    [transactionExchangeType]: '',
  }[type]

  const transactionModifierClass = {
    [transactionDepositType]: styles.Deposit,
    [transactionWithdrawType]: styles.Withdraw,
    [transactionExchangeType]: styles.Exchange,
  }[type]

  const transactionMoneyRowGetter = {
    [transactionDepositType]: () => `${transactionSign}${formatAsMoney(receivedAmount)} ${receivedCurrency}`,
    [transactionWithdrawType]: () => `${transactionSign}${formatAsMoney(lostAmount)} ${lostCurrency}`,
    [transactionExchangeType]: () => `+${formatAsMoney(receivedAmount)} ${receivedCurrency} -${formatAsMoney(lostAmount)} ${lostCurrency}`,
  }[type]

  return (
    <div 
      className={clsx(styles.TransactionCard, transactionModifierClass)}
      onClick={onClick}
    >
      <div className={styles.TransactionHeader}>
        <div className={styles.TransactionMoney}>
          {transactionMoneyRowGetter()}
        </div>

        <div className={styles.TransactionDate}>
          {formatFullDateWithoutYear(date)}
        </div>
      </div>

      <TextPreview text={description} />
    </div>
  )
}