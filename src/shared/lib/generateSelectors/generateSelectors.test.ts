import { DeepPartial } from '@reduxjs/toolkit'
import { StateSchema } from '@/app/providers/store'
import { generateSelectors } from './generateSelectors'

describe('generateSelectors', () => {
  test('should return values from state', () => {
    const defaultValues: StateSchema['login'] = {
      error: 'error',
      isLoading: true,
    }
    const state: DeepPartial<StateSchema> = {
      login: {
        error: undefined,
        isLoading: false,
      },
    }

    const result = generateSelectors('login', defaultValues)
    expect(result).toHaveProperty('getErrorSelector')
    expect(result).toHaveProperty('getIsLoadingSelector')

    expect(result.getErrorSelector(state as StateSchema)).toBeUndefined()
    expect(result.getIsLoadingSelector(state as StateSchema)).toBe(false)
  })

  test('should return defaultValues', () => {
    const defaultValues: StateSchema['login'] = {
      error: 'error',
      isLoading: true,
    }
    const state: DeepPartial<StateSchema> = {}

    const result = generateSelectors('login', defaultValues)
    expect(result).toHaveProperty('getErrorSelector')
    expect(result).toHaveProperty('getIsLoadingSelector')

    expect(result.getErrorSelector(state as StateSchema)).toBe('error')
    expect(result.getIsLoadingSelector(state as StateSchema)).toBe(true)
  })

  test('should return selectors only from defaultValues', () => {
    const defaultValues: Partial<StateSchema['login']> = {
      error: 'error',
    }
    const state: DeepPartial<StateSchema> = {
      login: {
        error: undefined,
        isLoading: true,
      },
    }

    const result = generateSelectors('login', defaultValues)
    expect(result).toHaveProperty('getErrorSelector')
    expect(result).not.toHaveProperty('getIsLoadingSelector')

    expect(result.getErrorSelector?.(state as StateSchema)).toBeUndefined()
  })

  test('should correct work with empty defaultValues', () => {
    const defaultValues = {}

    const result = generateSelectors('login', defaultValues)
    expect(result).toEqual({})
  })

  test('should correct work without reducer', () => {
    const defaultValues: StateSchema['login'] = {
      error: 'error',
      isLoading: true,
    }
    const state: DeepPartial<StateSchema> = {}

    const result = generateSelectors('login', defaultValues)
    expect(result).toHaveProperty('getErrorSelector')
    expect(result).toHaveProperty('getIsLoadingSelector')

    expect(result.getErrorSelector?.(state as StateSchema)).toBe('error')
    expect(result.getIsLoadingSelector?.(state as StateSchema)).toBe(true)
  })
})
