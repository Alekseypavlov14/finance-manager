import { Entity } from '@/shared/types/entity'
import { Id } from '@/shared/types/id'

export interface Repository<T extends Entity = Entity, DTO = Omit<T, 'id'>> {
  get(): Promise<T[]>
  getById(id: Id): Promise<T | null>
  getByFilters(filters: Partial<T>): Promise<T[]>
  create(dto: DTO): Promise<T | null>
  updateById(id: Id, dto: Partial<DTO>): Promise<T | null>
  deleteById(id: Id): Promise<T | null>
}
