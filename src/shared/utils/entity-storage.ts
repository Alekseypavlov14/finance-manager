import { DAY_IN_MILLISECONDS } from '../constants'
import { Cache } from '@oleksii-pavlov/storages'

export class EntityStorage<T> {
  private cache: Cache<T[]>

  constructor(
    key: string,
    private readonly getter: () => T[] | Promise<T[]>,
    cacheTime: number = DAY_IN_MILLISECONDS,
  ) {
    this.cache = new Cache<T[]>(key, cacheTime)
  }

  async getItems() {
    const cachedItems = this.cache.getValue()
    if (cachedItems) return cachedItems

    const items = await this.getItemsSafely()
    this.cache.setValue(items)

    return items
  }

  async revalidate() {
    const items = await this.getItemsSafely()
    this.cache.setValue(items)
  }

  private async getItemsSafely(): Promise<T[]> {
    try {
      return await this.getter()
    } catch {
      return []
    }
  }
}
