import { Meta } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'shared/Button',
  component: Button,
}
export default meta

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
