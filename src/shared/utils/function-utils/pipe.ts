import { AnyFunction } from './types/function'

export function pipe<T extends AnyFunction[]>(...functions: T): T[number] {
  return (...args: Parameters<T[number]>): ReturnType<T[number]> => {
    return functions.reduce((result, fn) => {
      return Array.isArray(result) ? fn(...result) : fn(result)
    }, args as any)
  }
}
