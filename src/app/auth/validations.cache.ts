import { AUTH_VALIDATION_CACHE_KEY, AUTH_VALIDATION_CACHE_TIMEOUT } from '@/shared/constants'
import { Cache } from '@oleksii-pavlov/storages'

export type ValidationResult = boolean

export const validationSuccessResult: ValidationResult = true
export const validationFailureResult: ValidationResult = false

export const validationCacheStorage = new Cache<ValidationResult>(
  AUTH_VALIDATION_CACHE_KEY, 
  AUTH_VALIDATION_CACHE_TIMEOUT, 
  validationFailureResult
)
