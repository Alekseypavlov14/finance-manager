import { LoadingOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'
import { Spin } from 'antd'
import styles from './LoaderScreen.module.css'

interface LoaderScreenProps {
  children: ReactNode
}

export function LoaderScreen({ children }: LoaderScreenProps) {
  return (
    <div className={styles.LoaderScreen}>
      <Spin indicator={<LoadingOutlined spin />} />
      
      {children}
    </div>
  )
}