import { ReactNode } from 'react'
import { Loader } from '@/shared/components/Loader'
import { Center } from '@/shared/components/Center'

interface LoaderScreenProps {
  children?: ReactNode
}

export function LoaderScreen({ children }: LoaderScreenProps) {
  return (
    <Center>
      <Loader />
      
      {children}
    </Center>
  )
}