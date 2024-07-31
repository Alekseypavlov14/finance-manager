import { Entity } from '@/shared/types/entity'

export interface CurrencyEntity extends Entity {
  label: string
} 

export interface CurrencyEntityDTO extends CurrencyEntity {}
