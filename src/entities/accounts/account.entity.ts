import { Entity } from '@/shared/types/entity'

export interface AccountEntity extends Entity {
  email: string
  password: string
}