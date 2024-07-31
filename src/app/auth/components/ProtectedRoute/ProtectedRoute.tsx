import { useValidateCredentials } from '../../hooks/use-validate-credentials'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isValidationSuccessful, isProcessing } = useValidateCredentials()

  if (isProcessing) {
    return <LoaderScreen>Validating...</LoaderScreen>
  }

  if (!isValidationSuccessful) {
    return <>Error...</>
  }

  return children
}