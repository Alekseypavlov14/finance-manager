import { TransactionEntity, transactionRepository } from '@/entities/transactions'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export interface UseTransactionByIdResult {
  transaction: TransactionEntity | null
  isLoading: boolean
}

export function useTransactionById(onError: VoidFunction = () => {}): UseTransactionByIdResult {
  const [transaction, setTransaction] = useState<TransactionEntity | null>(null)
  const [isLoading, setLoading] = useState(true)

  const { id } = useParams()

  useEffect(() => {
    if (!id) {
      setTransaction(null)
      setLoading(false)

      return onError()
    }

    transactionRepository.getById(id).then(transaction => {
      if (!transaction) onError()
      
      setTransaction(transaction)
      setLoading(false)
    })
  }, [])

  return ({ isLoading, transaction })
}
