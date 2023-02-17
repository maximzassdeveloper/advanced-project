import { Button } from './Button'

export default {
  title: 'Button',
  component: Button,
}

export const Themes = () => (
  <div>
    <Button theme='primary'>Primary</Button>
    <Button theme='secondary'>Secondary</Button>
    <Button theme='outline'>Outline</Button>
  </div>
)

export const Sizes = () => (
  <div>
    <Button size='m'>Button M</Button>
    <Button size='l'>Button L</Button>
  </div>
)
