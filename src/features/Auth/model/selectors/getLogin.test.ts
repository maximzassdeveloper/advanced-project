import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/store'
import { getLogin } from './getLogin'
import { initialState } from '../slices/loginSlice'

describe('getLogin selector test', () => {
  test('should return correct data', () => {
    const state: DeepPartial<StateSchema> = {
      login: { error: 'SERVER', isLoading: true },
    }
    expect(getLogin(state as StateSchema)).toEqual({ error: 'SERVER', isLoading: true })
  })

  test('should work with empty state', () => {
    const state: DeepPartial<StateSchema> = {}
    expect(getLogin(state as StateSchema)).toEqual(initialState)
  })
})
