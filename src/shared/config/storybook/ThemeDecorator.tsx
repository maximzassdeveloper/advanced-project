import { FC, ReactNode, useEffect } from 'react'
import { StoryContext } from '@storybook/react'
import { ThemeProvider, useTheme, ThemeType } from '@/app/providers/theme'

export const ThemeToggler: FC<{ theme: ThemeType }> = ({ theme }) => {
  const { toggleTheme } = useTheme()

  useEffect(() => {
    toggleTheme(theme)
  }, [toggleTheme, theme])

  return <></>
}

interface ThemeDecoratorProps {
  children: ReactNode
  context: StoryContext
}

export const ThemeDecorator = ({ children, context }: ThemeDecoratorProps) => {
  const theme = context.parameters.theme || context.globals.theme
  const storyTheme: ThemeType = theme === 'dark' ? 'dark' : 'light'

  return (
    <ThemeProvider defaultTheme={storyTheme}>
      <ThemeToggler theme={storyTheme} />
      {children}
    </ThemeProvider>
  )
}
