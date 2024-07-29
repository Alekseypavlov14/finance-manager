import { createBrowserRouter } from 'react-router-dom'

export const routing = createBrowserRouter([
  {
    path: '/',
    element: <>Home</>
  },
  {
    path: '/transactions',
    element: <>Transactions</>
  },
  {
    path: '/statistics',
    element: <>Statistics</>
  },
  {
    path: '/settings',
    element: <>Settings</>
  },
  {
    path: '*',
    element: <>Not Found</>
  }
])
