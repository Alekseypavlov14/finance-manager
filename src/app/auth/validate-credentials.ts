import { validationCacheStorage, validationSuccessResult } from './validations.cache'
import { getAccountByFilters } from '@/entities/accounts'
import { credentialsStorage } from './credentials'

export interface CredentialsValidatorControllers {
  onSuccess?: () => void | Promise<void>
  onError?: () => void | Promise<void>
}

const defaultController = () => {}

export async function validateCredentials(controllers: CredentialsValidatorControllers = {}) {
  const normalizedControllers: Required<CredentialsValidatorControllers> = {
    onSuccess: controllers.onSuccess || defaultController,
    onError: controllers.onError || defaultController
  }

  const credentials = credentialsStorage.getValue()
  if (!credentials) return normalizedControllers.onError()

  const cachedValidationResult = validationCacheStorage.getValue()
  if (cachedValidationResult) return normalizedControllers.onSuccess()

  const accountCandidate = await getAccountByFilters({
    email: credentials.email,
    password: credentials.password
  })

  if (!accountCandidate) return normalizedControllers.onError()

  validationCacheStorage.setValue(validationSuccessResult)
  normalizedControllers.onSuccess()
}
