import { MobileBottomBar } from '@/widgets/MobileBottomBar'
import { Navigation } from '@/widgets/Navigation'
import { ReactNode } from 'react'
import styles from './StructureLayout.module.css'

interface StructureLayoutProps {
  children: ReactNode
}

export function StructureLayout({ children }: StructureLayoutProps) {
  return (
    <div className={styles.StructureLayout}>
      <div className={styles.Main}>
        {children}
      </div>

      <MobileBottomBar>
        <Navigation />
      </MobileBottomBar>
    </div>
  )
}