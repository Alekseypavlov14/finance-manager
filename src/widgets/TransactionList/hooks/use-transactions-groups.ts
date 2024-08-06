import { getGroupedTransactions } from '../utils/get-grouped-transactions'
import { TransactionGroupType } from '../types/transaction-group-type'
import { useEffect, useState } from 'react'
import { TransactionEntity } from '@/entities/transactions'
import { TransactionGroup } from '../types/transaction-group'
import { useCurrencies } from '@/entities/currency'
import { useRates } from '@/entities/rates'

export function useTransactionsGroups(transactions: TransactionEntity[], groupingType: TransactionGroupType) {
  const { currencies } = useCurrencies()
  const { rates } = useRates()

  const [transactionsGroups, setTransactionsGroups] = useState<TransactionGroup[]>([])

  useEffect(() => {
    setTransactionsGroups(getGroupedTransactions({
      transactions,
      currencies,
      rates,
      groupingType,
    }))
  }, [transactions, groupingType, currencies, rates])

  return transactionsGroups
}