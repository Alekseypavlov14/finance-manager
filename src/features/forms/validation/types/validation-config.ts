import { ValidationRule } from './validation-rule'

export type ValidationConfig<T> = {
  [K in keyof T]: ValidationRule<T[K]>
}
