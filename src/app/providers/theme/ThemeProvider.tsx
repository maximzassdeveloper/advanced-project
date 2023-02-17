import { FC, useEffect, useState } from 'react'
import { THEME_lOCAL_STORAGE_KEY, ThemeContext, ThemeContextValue, ThemeType } from './ThemeContext'

const themeFormStorage: ThemeType = localStorage.getItem(THEME_lOCAL_STORAGE_KEY) as ThemeType

interface ThemeProviderProps {
  defaultTheme?: ThemeType
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children, defaultTheme } = props
  const [theme, setTheme] = useState<ThemeType>(defaultTheme || themeFormStorage || 'dark')

  useEffect(() => {
    const themes = Object.values(ThemeType) as string[]
    themes.forEach((themeClass) => {
      document.body.classList.remove(themeClass)
    })
    document.body.classList.add(theme)
  }, [theme])

  const defaultValue: ThemeContextValue = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={defaultValue}>{children}</ThemeContext.Provider>
}
