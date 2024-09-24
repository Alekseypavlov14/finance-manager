import { Entity } from '@/shared/types/entity'

export interface Group<T extends Entity, K> {
  entities: T[]
  key: K
}

export function groupBy<T extends Entity, K>(entities: T[], callback: (entity: T) => K[]): Group<T, K>[] {
  const keys = entities.map(callback).flat()
  const uniqueKeys = Array.from(new Set(keys))

  const groups = uniqueKeys.map(key => ({
    entities: entities.filter(entity => callback(entity).includes(key)),
    key: key
  }))

  return groups
}
