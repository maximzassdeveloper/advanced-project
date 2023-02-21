import { useCallback, useContext } from 'react'
import { THEME_lOCAL_STORAGE_KEY, ThemeContext, ThemeType } from './ThemeContext'

interface UseThemeResult {
  theme: ThemeType
  toggleTheme: (theme?: ThemeType) => void
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = useCallback(
    (themeFromUser?: ThemeType) => {
      const newTheme = themeFromUser || (theme === 'light' ? 'dark' : 'light')
      setTheme(newTheme)
      localStorage.setItem(THEME_lOCAL_STORAGE_KEY, newTheme)
    },
    [theme, setTheme]
  )

  return {
    theme,
    toggleTheme,
  }
}
