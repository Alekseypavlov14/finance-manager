import { createBrowserRouter, Navigate } from 'react-router-dom'
import { StructureLayout } from '@/layouts/StructureLayout'

export const routing = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to='/statistics' />
  },
  {
    path: '/transactions',
    element: <StructureLayout>transactions</StructureLayout>
  },
  {
    path: '/create-transaction',
    element: <>create transaction</>
  },
  {
    path: '/statistics',
    element: <StructureLayout>statistics</StructureLayout>
  },
  {
    path: '/settings',
    element: <StructureLayout>settings</StructureLayout>
  },
  {
    path: '*',
    element: <StructureLayout>not found</StructureLayout>
  }
])
