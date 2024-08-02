import { ReactNode } from 'react'

export interface Option<T> {
  label: ReactNode
  value: T
}