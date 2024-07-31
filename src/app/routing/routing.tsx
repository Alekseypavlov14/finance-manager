import { createBrowserRouter, Navigate } from 'react-router-dom'
import { CreateTransactionPage } from '@/pages/CreateTransactionPage'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
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
    path: '/create-transaction',
    element: <CreateTransactionPage />
  },
  {
    path: '/transactions',
    element: <ProtectedRoute><StructureLayout>transactions</StructureLayout></ProtectedRoute>
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
    path: '*',
    element: <StructureLayout>not found</StructureLayout>
  }
])
