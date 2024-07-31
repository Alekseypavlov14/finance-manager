import { AnyFunction } from './types/function'

export function combine<T extends AnyFunction[]>(...functions: T) {
  return (...args: Parameters<T[number]>) => functions.forEach(fn => fn(...args))
} 
