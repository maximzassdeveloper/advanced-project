export function isObject(val: unknown): val is Record<PropertyKey, any> {
  return typeof val === 'object' && val !== null
}

/**
 * Typed Object.keys
 */
export function objectKeys<T extends Record<PropertyKey, any>>(obj: T): (keyof T)[] {
  return Object.keys(obj)
}
