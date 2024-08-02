import { useValidateCredentials } from '../../hooks/use-validate-credentials'
import { LoaderScreen } from '@/widgets/LoaderScreen'
import { ReactNode } from 'react'
import { Headline } from '@/shared/components/Headline'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isValidationSuccessful, isProcessing } = useValidateCredentials()

  if (isProcessing) return (
    <LoaderScreen>
      <Headline level={6}>Validating...</Headline>
    </LoaderScreen>
  )

  if (!isValidationSuccessful) {
    return <Navigate to='/login' />
  }

  return children
}