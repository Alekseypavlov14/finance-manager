import { AccountSection } from './components/AccountSection'
import { ProtectedRoute } from '@/app/auth'
import { ThemesSection } from './components/ThemesSection'
import { Container } from '@/shared/components/Container'
import { Header } from '@/widgets/Header'
import { Page } from '@/shared/components/Page'
import styles from './SettingsPage.module.css'

export function SettingsPage() {
  return (
    <ProtectedRoute>
      <Page className={styles.SettingsPage}>
        <Header />

        <Container className={styles.SettingsContent}>
          <AccountSection />
          <ThemesSection />
        </Container>
      </Page>
    </ProtectedRoute>
  )
}