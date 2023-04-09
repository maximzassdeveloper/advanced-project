import { AxiosError, AxiosResponse } from 'axios'

export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null
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
