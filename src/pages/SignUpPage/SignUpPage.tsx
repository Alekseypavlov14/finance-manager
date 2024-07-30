import { AuthForm, signUpMode } from '@/widgets/AuthForm'
import { Page } from '@/shared/components/Page'
import styles from './SignUpPage.module.css'

export function SignUpPage() {
  return (
    <Page className={styles.SignUpPage}>
      <AuthForm mode={signUpMode} />
    </Page>
  )
}