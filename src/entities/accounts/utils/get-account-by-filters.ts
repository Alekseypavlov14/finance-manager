import { accountsRepository } from '../accounts.repository'
import { AccountEntity } from '../account.entity'

export async function getAccountByFilters(filters: Partial<AccountEntity>): Promise<AccountEntity | null> {
  const candidates = await accountsRepository.getByFilters(filters)
  return candidates[0] ?? null
}
