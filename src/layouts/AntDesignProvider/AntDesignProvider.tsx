import { App, ConfigProvider } from 'antd'
import { useThemeData } from '@/app/themes'
import { ReactNode } from 'react'
import styles from './AntDesignProvider.module.css'

interface AntDesignProviderProps {
  children: ReactNode
}

export function AntDesignProvider({ children }: AntDesignProviderProps) {
  const themeData = useThemeData()

  return (
    <App className={styles.App}>
      <ConfigProvider theme={themeData}>
        {children}
      </ConfigProvider>
    </App>
  )
}
