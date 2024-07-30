import { ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { ReactNode } from 'react'
import { useThemeData } from '@/app/themes'

interface AntDesignProviderProps {
  children: ReactNode
}

export function AntDesignProvider({ children }: AntDesignProviderProps) {
  const themeData = useThemeData()

  return (
    <ConfigProvider theme={themeData}>
      <StyleProvider layer>
        {children}
      </StyleProvider>
    </ConfigProvider>
  )
}
