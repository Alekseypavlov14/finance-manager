import { ExclamationCircleOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'
import { Center } from '@/shared/components/Center'
import styles from './ErrorScreen.module.css'

interface ErrorScreenProps {
  children?: ReactNode
}

export function ErrorScreen({ children }: ErrorScreenProps) {
  return (
    <Center className={styles.ErrorScreen}>
      <ExclamationCircleOutlined className={styles.ErrorScreenIcon} />

      {children}
    </Center>
  )
}