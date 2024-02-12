import { Preview } from '@storybook/react'
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator'
import { I18nextDecorator } from '../../src/shared/config/storybook/I18nextDecorator'
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator'
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator'

const preview: Preview = {
  decorators: [
    (Story, storyContext) => (
      <RouterDecorator>
        <I18nextDecorator>
          <StyleDecorator>
            <ThemeDecorator context={storyContext}>
              <Story />
            </ThemeDecorator>
          </StyleDecorator>
        </I18nextDecorator>
      </RouterDecorator>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true },
    mockAddonConfigs: {
      globalMockData: [
        {
          url: '*',
          method: 'GET',
          status: 200,
          response: {},
        },
      ],
      ignoreQueryParams: true,
      refreshStoryOnUpdate: true,
      disableUsingOriginal: true,
      disable: false,
    },
  },
  globalTypes: {
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
  },
}

export default preview
