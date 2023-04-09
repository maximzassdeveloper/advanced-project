import { addDecorator } from '@storybook/react'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator'
import { I18nextDecorator } from '../../src/shared/config/storybook/I18nextDecorator'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: { disable: true },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', icon: 'circlehollow', title: 'Light' },
        { value: 'dark', icon: 'circle', title: 'Dark' },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
}

addDecorator(RouterDecorator)
addDecorator(I18nextDecorator)
addDecorator(StyleDecorator)
addDecorator(ThemeDecorator)
