import { getDocs, collection, query, where, addDoc, updateDoc, deleteDoc, CollectionReference, QueryFieldFilterConstraint } from 'firebase/firestore'
import { Repository } from '../database'
import { generateId } from '../generate-id'
import { Entity } from '@/shared/types/entity'
import { Id } from '@/shared/types/id'
import { db } from './index'

export class FirebaseRepository<T extends Entity = Entity, DTO = Omit<T, 'id'>> implements Repository<T, DTO> {
  private readonly collection: CollectionReference

  constructor(
    collectionKey: string,
    private readonly entityCreator: (dto: DTO) => Entity = this.getEntityDataByDTO
  ) {
    this.collection = collection(db, collectionKey)
  }

  async get(): Promise<T[]> {
    return this.getByFilters({})
  }

  async getById(id: Id): Promise<T | null> {
    const candidates = await this.getByFilters({ id } as Partial<T>)
    return candidates[0] ?? null
  }

  async getByFilters(filters: Partial<T>): Promise<T[]> {
    const q = query(this.collection, ...this.mapFiltersToFirebaseEntries(filters))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => doc.data() as T)
  }

  async create(dto: DTO): Promise<T | null> {
    const entity = this.entityCreator(dto)
    await addDoc(this.collection, entity)

    return this.getById(entity.id)
  }

  async updateById(id: Id, dto: Partial<DTO>): Promise<T | null> {
    const docRef = await this.getDocumentRefByEntityId(id)
    if (!docRef) return null

    await updateDoc(docRef, dto as any)

    return this.getById(id)
  }

  async deleteById(id: Id): Promise<T | null> {
    const docRef = await this.getDocumentRefByEntityId(id)
    if (!docRef) return null

    const entity = await this.getById(id)

    await deleteDoc(docRef)
    return entity
  }

  private getEntityDataByDTO(dto: DTO): Entity {
    return ({ id: generateId(), ...dto })
  }
 
  private mapFiltersToFirebaseEntries(filters: Partial<T>): QueryFieldFilterConstraint[] {
    const filterKeys = Object.keys(filters)
    const filterEntries = filterKeys.map(key => where(key, '==', (filters as any)[key]))

    return filterEntries
  }

  private async getDocumentRefByEntityId(id: Id) {
    const q = query(this.collection, ...this.mapFiltersToFirebaseEntries({ id } as Partial<T>))
    const querySnapshot = await getDocs(q)

    const documentReferences = querySnapshot.docs.map(doc => doc.ref)
    return documentReferences[0] ?? null
  }
}
