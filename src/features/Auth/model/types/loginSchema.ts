export interface LoginSchema {
  isLoading: boolean
  error: undefined | string
}

export enum LoginError {
  'SERVER' = 'SERVER',
  'INCORRECT' = 'INCORRECT',
  'UNKNOWN' = 'UNKNOWN',
}
