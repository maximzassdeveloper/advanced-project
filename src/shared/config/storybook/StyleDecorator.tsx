import { Story } from '@storybook/react'
import '@/app/styles/index.scss'
import '@/app/styles/storybook.scss'

export const StyleDecorator = (StoryComponent: Story) => (
  <div className='app'>
    <StoryComponent />
  </div>
)
