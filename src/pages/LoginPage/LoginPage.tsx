import { AuthForm, loginMode } from '@/widgets/AuthForm'
import { Page } from '@/shared/components/Page'
import styles from './LoginPage.module.css'

export function LoginPage() {
  return (
    <Page className={styles.LoginPage}>
      <AuthForm mode={loginMode} />
    </Page>
  )
}