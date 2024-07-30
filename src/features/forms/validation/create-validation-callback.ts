import { ValidationConfig } from './types/validation-config'

export function createFormValidation<T extends Record<string, any>>(validationConfig: ValidationConfig<T>) {
  return (data: T) => {
    const errors: Record<keyof T, string> = {} as Record<keyof T, string>

    Object.keys(data).forEach(key => {
      if (!validationConfig[key]) return

      if (!validationConfig[key](data[key])) {
        errors[key as keyof T] = `${key} field is invalid`
      }
    })

    return errors
  }
}
