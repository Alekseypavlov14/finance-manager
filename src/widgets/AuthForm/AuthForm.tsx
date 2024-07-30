import { AuthState, initialValues, validateForm } from './form'
import { Credentials, login, signUp } from '@/app/auth'
import { Button, Input } from 'antd'
import { Form, Formik } from 'formik'
import { Headline } from '@/shared/components/Headline'
import styles from './AuthForm.module.css'

export type AuthFormMode = 'login' | 'sign-up'

interface AuthFormProps {
  mode: AuthFormMode
}

export const loginMode: AuthFormMode = 'login'
export const signUpMode: AuthFormMode = 'sign-up'

export function AuthForm({ mode }: AuthFormProps) {
  const action = mode === loginMode ? login : signUp

  function submitFormHandler(data: AuthState) {
    const credentials: Credentials = {
      email: data.email,
      password: data.password,
    }

    console.log(credentials)
  }

  const formTitleText = mode === loginMode 
    ? 'Login'
    : 'Sign up'

  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={submitFormHandler}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form 
          className={styles.AuthForm}
          onSubmit={handleSubmit}
        >
          <Headline center level={1}>
            {formTitleText}
          </Headline>

          <Input 
            name='email'
            value={values.email} 
            onInput={handleChange}
            onBlur={handleBlur}
            placeholder='Email'
            status={errors.email && touched.email ? 'error' : ''}
          />

          <Input 
            name='password'
            type='password'
            placeholder='Password'
            onInput={handleChange}
            onBlur={handleBlur}
            value={values.password}
            status={errors.password && touched.password ? 'error' : ''}
          />

          <Button 
            type='primary'
            htmlType='submit'
          >
            Welcome!
          </Button>
        </Form>
      )}
    </Formik>
  )
}