import { AntDesignProvider } from './layouts/AntDesignProvider'
import { RouterProvider } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { routing } from '@/app/routing'
import '@/app/themes'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AntDesignProvider>
      <RouterProvider router={routing} />
    </AntDesignProvider>
  </StrictMode>
)
