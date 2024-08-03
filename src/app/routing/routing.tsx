import { createBrowserRouter, Navigate } from 'react-router-dom'
import { CreateTransactionPage } from '@/pages/CreateTransactionPage'
import { TransactionListPage } from '@/pages/TransactionListPage'
import { StructureLayout } from '@/layouts/StructureLayout'
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
    element: <StructureLayout><h1>statistics</h1></StructureLayout>
  },
  {
    path: '/transactions/create',
    element: <CreateTransactionPage />
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
    element: <StructureLayout>not found</StructureLayout>
  }
])
