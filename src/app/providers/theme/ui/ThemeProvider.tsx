import { FC, useState } from 'react'
import {
  THEME_lOCAL_STORAGE_KEY,
  ThemeContext,
  ThemeContextValue,
  ThemeType,
} from '../lib/ThemeContext'

const themeFormStorage: ThemeType =
  (localStorage.getItem(THEME_lOCAL_STORAGE_KEY) as ThemeType) || 'dark'
export const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>(themeFormStorage)

  const defaultValue: ThemeContextValue = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={defaultValue}>{children}</ThemeContext.Provider>
}
