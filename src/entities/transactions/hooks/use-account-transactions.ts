import { accountTransactionsStorage } from '../account-transactions.storage'
import { useEffect, useState } from 'react'
import { TransactionEntity } from '../transaction.entity'

export function useAccountTransactions(): TransactionEntity[] {
  const [transactions, setTransactions] = useState<TransactionEntity[]>([])

  useEffect(() => {
    accountTransactionsStorage.getValue().then(setTransactions)
  }, [])

  return transactions
}
