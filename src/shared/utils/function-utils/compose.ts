import { AnyFunction } from './types/function'

export function compose<T extends AnyFunction[]>(...functions: T): T[number] {
  return (...args: Parameters<T[number]>): ReturnType<T[number]> => {
    return functions.reduceRight((result, fn) => {
      return Array.isArray(result) ? fn(...result) : fn(result)
    }, args as any)
  }
}
