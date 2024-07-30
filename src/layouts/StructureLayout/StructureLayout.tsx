import { MobileBottomBar } from '@/widgets/MobileBottomBar'
import { Navigation } from '@/widgets/Navigation'
import { ReactNode } from 'react'
import { Header } from '@/widgets/Header'
import { Page } from '@/shared/components/Page'
import styles from './StructureLayout.module.css'

interface StructureLayoutProps {
  children: ReactNode
}

export function StructureLayout({ children }: StructureLayoutProps) {
  return (
    <Page className={styles.StructureLayout}>
      <Header />

      <div className={styles.Main}>
        {children}
      </div>

      <MobileBottomBar>
        <Navigation />
      </MobileBottomBar>
    </Page>
  )
}