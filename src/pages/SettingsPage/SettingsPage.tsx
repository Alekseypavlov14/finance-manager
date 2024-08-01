import { ProtectedRoute } from '@/app/auth'
import { Header } from '@/widgets/Header'
import { Page } from '@/shared/components/Page'
import styles from './SettingsPage.module.css'

export function SettingsPage() {
  return (
    <ProtectedRoute>
      <Page className={styles.SettingsPage}>
        <Header />
      </Page>
    </ProtectedRoute>
  )
}