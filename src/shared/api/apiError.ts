import { AxiosError, AxiosResponse } from 'axios'
import { isObject } from '../lib/object'

export enum STANDART_API_ERRORS {
  'SERVER' = 'SERVER',
  'UNKNOWN' = 'UNKNOWN',
  'INCORRECT' = 'INCORRECT',
}

// Own function for checking AxiosError, because isAxiosError from axios doesn't work with tests
export function isAxiosError(value: unknown): value is AxiosError {
  return isObject(value) && 'isAxiosError' in value
}

interface CreateAxiosErrorProps {
  status?: AxiosResponse['status']
  data?: AxiosResponse['data']
}

// Create object of AxiosError for tests
export function createAxiosError({ status, data }: CreateAxiosErrorProps): AxiosError {
  return {
    isAxiosError: true,
    response: { status, data },
  } as AxiosError
}
