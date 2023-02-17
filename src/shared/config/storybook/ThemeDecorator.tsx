import { FC, useEffect } from 'react'
import { Story, StoryContext } from '@storybook/react'
import { ThemeProvider, useTheme, ThemeType } from '@/app/providers/theme'

export const ThemeToggler: FC<{ theme: ThemeType }> = ({ theme }) => {
  const { toggleTheme } = useTheme()

  useEffect(() => {
    toggleTheme(theme)
  }, [theme])

  return <></>
}

export const ThemeDecorator = (StoryComponent: Story, context: StoryContext) => {
  const theme = context.parameters.theme || context.globals.theme
  const storyTheme: ThemeType = theme === 'dark' ? 'dark' : 'light'

  return (
    <ThemeProvider defaultTheme={storyTheme}>
      <ThemeToggler theme={storyTheme} />
      <StoryComponent />
    </ThemeProvider>
  )
}
