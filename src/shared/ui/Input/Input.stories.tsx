import { Meta } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'shared/Input',
  component: Input,
}
export default meta

export const Default = () => (
  <div className='flex column'>
    <Input placeholder='Wow placeholder' />
    <Input value='Woow value' />
  </div>
)

export const WithLabel = () => (
  <div>
    <Input value='Woow value' label='Label for input' />
  </div>
)

export const WithError = () => (
  <div className='flex column'>
    <Input value='Woow value' error />
    <Input value='Woow value' error='error message' />
  </div>
)

export const Readonly = () => (
  <div>
    <Input value='Woow value' readOnly />
  </div>
)
