import React from 'react'
import { ComponentStory, Meta } from '@storybook/react'

import { Sidebar } from './Sidebar'

export default {
  title: 'widget/Sidebar',
  component: Sidebar,
} as Meta<typeof Sidebar>

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />

export const Default = Template.bind({})
Default.args = {}
