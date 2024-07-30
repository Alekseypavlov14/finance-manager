import { updateEmail, updatePassword, useAuthStore } from './auth.store'
import { ChangeEvent } from 'react'
import { Headline } from '@/shared/components/Headline'
import { Input } from '@/shared/components/Input'
import styles from './AuthForm.module.css'

export type AuthFormMode = 'login' | 'sign-up'

interface AuthFormProps {
  mode: AuthFormMode
}

export const loginMode: AuthFormMode = 'login'
export const signUpMode: AuthFormMode = 'sign-up'

export function AuthForm({ mode }: AuthFormProps) {
  const email = useAuthStore(state => state.email)
  const password = useAuthStore(state => state.password)

  function updateEmailHandler(e: ChangeEvent<HTMLInputElement>) {
    updateEmail(e.target.value.trim())
  }
  function updatePasswordHandler(e: ChangeEvent<HTMLInputElement>) {
    updatePassword(e.target.value.trim())
  }

  const formTitleText = mode === loginMode 
    ? 'Login'
    : 'Sign up'

  return (
    <div className={styles.AuthForm}>
      <Headline center level={1}>
        {formTitleText}
      </Headline>

      <Input 
        value={email} 
        onInput={updateEmailHandler}
        placeholder='Email'
      />

      <Input 
        type='password'
        placeholder='Password'
        onInput={updatePasswordHandler}
        value={password}
      />
    </div>
  )
}