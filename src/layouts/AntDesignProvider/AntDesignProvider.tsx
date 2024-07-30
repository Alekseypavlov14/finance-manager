import { ConfigProvider } from 'antd'
import { useThemeData } from '@/app/themes'
import { ReactNode } from 'react'

interface AntDesignProviderProps {
  children: ReactNode
}

export function AntDesignProvider({ children }: AntDesignProviderProps) {
  const themeData = useThemeData()

  return (
    <ConfigProvider theme={themeData}>
      {children}
    </ConfigProvider>
  )
}
