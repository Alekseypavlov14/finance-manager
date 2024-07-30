import { validateCredentials } from '../validate-credentials'
import { useEffect, useState } from 'react'
import { useNavigation } from '@/app/routing'

export function useValidateCredentials() {
  const [isValidationSuccessful, setValidationSuccessful] = useState(false)
  const [isProcessing, setProcessing] = useState(true)
  const { navigateLoginPage } = useNavigation()

  useEffect(() => {
    validateCredentials({
      onSuccess: () => {
        setValidationSuccessful(true)
        setProcessing(false)
      },
      onError: () => {
        setValidationSuccessful(false)
        setProcessing(false)
        navigateLoginPage()
      }
    })
  }, [])

  return { isValidationSuccessful, isProcessing }
}