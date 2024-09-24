import { createFormValidator, hasMaxLength, hasMinLength, isEmail, isNotEmptyString, multiple } from '@oleksii-pavlov/forms'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/shared/constants'

export interface AuthState {
  email: string
  password: string
}

export const initialValues: AuthState = {
  email: '',
  password: '',
}

export const validateForm = createFormValidator<AuthState>({
  email: multiple([
    isNotEmptyString, 
    isEmail
  ]),
  password: multiple([
    isNotEmptyString, 
    hasMinLength(PASSWORD_MIN_LENGTH), 
    hasMaxLength(PASSWORD_MAX_LENGTH)
  ]),
})
