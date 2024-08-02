import { RATES_API_REQUEST_BASE } from '../constants'
import { httpService } from '@/shared/utils/http'
import { average } from '@/shared/utils/numbers'

export async function getRateByCurrencyCodes(code1: string, code2: string): Promise<number> {
  const requestURL = `${RATES_API_REQUEST_BASE}${code1}-${code2}`
  const response = await httpService.get(requestURL).catch(() => {})

  const responseKey = `${code1}${code2}`

  const rateMin = response[responseKey]?.low ?? 0
  const rateMax = response[responseKey]?.high ?? 0

  const rate = average(rateMin, rateMax) || 0

  return rate
}
