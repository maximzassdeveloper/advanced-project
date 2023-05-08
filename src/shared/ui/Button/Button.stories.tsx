import { ComponentMeta } from '@storybook/react'
import { Button } from './Button'

export default {
  title: 'shared/Button',
  component: Button,
} as ComponentMeta<typeof Button>

export const Themes = () => (
  <div>
    <Button theme='primary'>Primary</Button>
    <Button theme='secondary'>Secondary</Button>
    <Button theme='outline'>Outline</Button>
    <Button theme='clear'>Clear</Button>
  </div>
)

export const Sizes = () => (
  <div>
    <Button size='s'>Button S</Button>
    <Button size='m'>Button M</Button>
    <Button size='l'>Button L</Button>
  </div>
)

export const Loading = () => <Button loading>Button</Button>
