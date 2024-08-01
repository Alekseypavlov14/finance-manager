import { Entity } from '@/shared/types/entity'
import { Id } from '@/shared/types/id'

export function findById<T extends Entity>(id: Id) {
  return (entity: T) => entity.id === id
}
