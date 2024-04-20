import { Country } from '@/entities/Country'
import { Currency } from '@/entities/Currency'

export interface Profile {
  id: string
  username: string
  fullName?: string
  avatar?: string
  birthday?: string
  gender?: 'male' | 'female' | 'unknown'
  currency: Currency
  country?: Country
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
