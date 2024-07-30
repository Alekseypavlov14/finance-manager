import { Headline } from '@/shared/components/Headline'
import styles from './AuthForm.module.css'

export type AuthFormMode = 'login' | 'sign-up'

interface AuthFormProps {
  mode: AuthFormMode
}

export const loginMode: AuthFormMode = 'login'
export const signUpMode: AuthFormMode = 'sign-up'

export function AuthForm({ mode }: AuthFormProps) {
  const formTitleText = mode === loginMode 
    ? 'Login'
    : 'Sign up'

  return (
    <div className={styles.AuthForm}>
      <Headline center level={1}>
        {formTitleText}
      </Headline>

    </div>
  )
}