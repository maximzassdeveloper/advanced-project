import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Switch } from './Switch'

export default {
  title: 'shared/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

export const Default: ComponentStory<typeof Switch> = (args) => (
  <div>
    <Switch
      {...args}
      checked
    />
    <Switch
      {...args}
      checked={false}
    />
  </div>
)
Default.args = {}

export const Disabled: ComponentStory<typeof Switch> = (args) => (
  <div>
    <Switch
      {...args}
      checked
    />
    <Switch
      {...args}
      checked={false}
    />
  </div>
)
Disabled.args = {
  disabled: true,
}

export const WithIcon: ComponentStory<typeof Switch> = (args) => (
  <div>
    <Switch
      {...args}
      icon={<span style={{ left: 'calc(-100% + 5px)', position: 'absolute', top: '-3px' }}>I</span>}
      checked
    />
    <Switch
      {...args}
      icon={<span style={{ left: 'calc(100% + 5px)', position: 'absolute', top: '-3px' }}>I</span>}
      checked={false}
    />
  </div>
)
WithIcon.args = {}
