export type ValueOf<T> = T[keyof T]

export type WithoutReadonly<T> = {
  -readonly [K in keyof T]: T[K]
}
