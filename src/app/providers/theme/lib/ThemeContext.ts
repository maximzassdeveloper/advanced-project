import { createContext } from 'react'
import { ValueOf } from '@/shared/types/global'

const ThemeType = {
  LIGHT: 'light',
  DARK: 'dark',
} as const

export type ThemeType = ValueOf<typeof ThemeType>

export interface ThemeContextValue {
  theme: ThemeType
  setTheme: (theme: ThemeType) => void
}

export const ThemeContext = createContext({} as ThemeContextValue)

export const THEME_lOCAL_STORAGE_KEY = 'theme'
