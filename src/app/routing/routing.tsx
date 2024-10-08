import { createBrowserRouter, Navigate } from 'react-router-dom'
import { CreateTransactionPage } from '@/pages/CreateTransactionPage'
import { EditTransactionPage } from '@/pages/EditTransactionPage'
import { TransactionListPage } from '@/pages/TransactionListPage'
import { StatisticsPage } from '@/pages/StatisticsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { SettingsPage } from '@/pages/SettingsPage'
import { SignUpPage } from '@/pages/SignUpPage'
import { LoginPage } from '@/pages/LoginPage'

export const routing = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/statistics' />
  },
  {
    path: '/statistics',
    element: <StatisticsPage />
  },
  {
    path: '/transactions/create',
    element: <CreateTransactionPage />
  },
  {
    path: '/transactions/edit/:id',
    element: <EditTransactionPage />
  },
  {
    path: '/transactions/list',
    element: <TransactionListPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/settings',
    element: <SettingsPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])
