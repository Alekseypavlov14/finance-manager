import { useValidateCredentials } from '../../hooks/use-validate-credentials'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isValidationSuccessful, isProcessing } = useValidateCredentials()

  if (isProcessing) {
    return <>Validating...</>
  }

  if (!isValidationSuccessful) {
    return <>Error...</>
  }

  return children
}