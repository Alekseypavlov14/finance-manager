import { ReactNode } from 'react'
import styles from './MobileBottomBar.module.css'

interface MobileBottomBarProps {
  children: ReactNode
}

export function MobileBottomBar({ children }: MobileBottomBarProps) {
  return (
    <div className={styles.MobileBottomBar}>
      {children}
    </div>
  )
}
