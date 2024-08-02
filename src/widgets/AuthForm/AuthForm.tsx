import { AuthState, initialValues, validateForm } from './form'
import { Form, Formik, FormikHelpers } from 'formik'
import { Credentials, login, signUp } from '@/app/auth'
import { Button, Divider, Input } from 'antd'
import { handleHTTPException } from '@/shared/utils/exception'
import { useNotifications } from '@/features/notifications'
import { defaultHandler } from '@oleksii-pavlov/error-handling'
import { useNavigation } from '@/app/routing'
import { Headline } from '@/shared/components/Headline'
import { Link } from 'react-router-dom'
import styles from './AuthForm.module.css'

export type AuthFormMode = 'login' | 'sign-up'

interface AuthFormProps {
  mode: AuthFormMode
}

export const loginMode: AuthFormMode = 'login'
export const signUpMode: AuthFormMode = 'sign-up'

export function AuthForm({ mode }: AuthFormProps) {
  const { successMessage, errorMessage } = useNotifications()
  
  const action = mode === loginMode ? login : signUp
  const { navigateHomePage } = useNavigation()

  const successMessageText = mode === loginMode 
    ? 'You are logged in' 
    : 'You are signed in'

  async function submitFormHandler(data: AuthState, { resetForm }: FormikHelpers<AuthState>) {
    const credentials: Credentials = {
      email: data.email,
      password: data.password,
    }

    await action(credentials)
      .then(navigateHomePage)
      .then(() => successMessage(successMessageText))
      .catch(handleHTTPException({
        400: () => errorMessage('The request is incorrect'),
        401: () => errorMessage('Incorrect login or password'),
        409: () => errorMessage('This email is already registered'),
        500: () => errorMessage('Sorry, try again later'),
        [defaultHandler]: () => errorMessage('Sorry, try again later'),
      }))

    resetForm()
  }

  const formTitleText = mode === loginMode 
    ? 'Login'
    : 'Sign up'
  
  const otherLinkHref = mode === loginMode 
    ? '/sign-up'
    : '/login'

  const otherLinkText = mode === loginMode
    ? 'Or sign up'
    : 'Or login'

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
          <Headline center level={2}>
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

          <div className={styles.FormFooter}>
            <Button 
              type='primary'
              htmlType='submit'
            >
              Welcome!
            </Button>

            <Divider className={styles.Divider} />

            <Button type='link'>
              <Link to={otherLinkHref}>{otherLinkText}</Link>
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}