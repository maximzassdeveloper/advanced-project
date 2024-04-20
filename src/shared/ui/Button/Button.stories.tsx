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
    <Button theme='outline'>Outline</Button>
    <Button theme='clear'>Clear</Button>
  </div>
)

export const Sizes = () => (
  <div>
    <Button size='m'>Button M</Button>
    <Button size='s'>Button S</Button>
    <Button size='xs'>Button XS</Button>
  </div>
)

export const Disabled = () => (
  <div>
    <Button disabled theme='primary'>
      Primary
    </Button>
    <Button disabled theme='outline'>
      Outline
    </Button>
    <Button disabled theme='clear'>
      Clear
    </Button>
  </div>
)

export const Loading = () => (
  <div>
    <Button loading>Disabled</Button>
  </div>
)

export const Focused = () => (
  <div>
    <Button autoFocus>Focused</Button>
  </div>
)
