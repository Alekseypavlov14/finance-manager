import { createBrowserRouter, Navigate } from 'react-router-dom'
import { StructureLayout } from '@/layouts/StructureLayout'
import { ProtectedRoute } from '@/app/auth'
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
    element: <>create transaction</>
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
    path: '*',
    element: <StructureLayout>not found</StructureLayout>
  }
])
