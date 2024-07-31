import { validationCacheStorage, validationSuccessResult } from './validations.cache'
import { accountsRepository } from '@/entities/accounts'
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

  const cachedValidationResult = validationCacheStorage.getValue()
  if (cachedValidationResult) return normalizedControllers.onSuccess()

  const credentials = credentialsStorage.getValue()
  if (!credentials) return normalizedControllers.onError()

  const accountCandidates = await accountsRepository.getByFilters({
    email: credentials.email,
    password: credentials.password
  })

  const accountExists = accountCandidates.length > 0
  if (!accountExists) return normalizedControllers.onError()

  validationCacheStorage.setValue(validationSuccessResult)
  normalizedControllers.onSuccess()
}
