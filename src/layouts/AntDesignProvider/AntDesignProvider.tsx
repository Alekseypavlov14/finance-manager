import { StyleProvider } from '@ant-design/cssinjs'
import { ReactNode } from 'react'

interface AntDesignProviderProps {
  children: ReactNode
}

export function AntDesignProvider({ children }: AntDesignProviderProps) {
  return (
    <StyleProvider layer>
      {children}
    </StyleProvider>
  )
}
