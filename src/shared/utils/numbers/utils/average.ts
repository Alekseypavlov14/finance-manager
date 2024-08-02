import { sum } from './sum'

export function average(...numbers: number[]): number {
  return sum(...numbers) / numbers.length
}
