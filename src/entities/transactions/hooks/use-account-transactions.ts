import { accountTransactionsStorage } from '../account-transactions.storage'
import { useEffect, useState } from 'react'
import { TransactionEntity } from '../transaction.entity'

interface UseAccountTransactionsResult {
  transactions: TransactionEntity[]
  isLoading: boolean
}

export function useAccountTransactions(): UseAccountTransactionsResult {
  const [transactions, setTransactions] = useState<TransactionEntity[]>([])
  const [isLoading, setLoading] = useState(true)

  function stopLoading() {
    setLoading(false)
  }

  useEffect(() => {
    accountTransactionsStorage.getValue()
      .then(setTransactions)
      .then(stopLoading)
  }, [])

  return { transactions, isLoading }
}
