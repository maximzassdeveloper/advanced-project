import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

export interface Profile {
  id: number
  firstname: string
  lastname: string
  username: string
  avatar: string
  age: number
  currency: Currency
  country: Country
  city: string
}

export interface ProfileSchema {
  data?: Profile
  isLoading: boolean
  error?: string
  isReadonly: boolean
}

export enum ProfileError {
  'SERVER' = 'SERVER',
  'NOT_FOUND' = 'NOT_FOUND',
  'UNKNOWN' = 'UNKNOWN',
  'ON_SAVE' = 'ON_SAVE',
  'ON_GET' = 'ON_GET',
}
