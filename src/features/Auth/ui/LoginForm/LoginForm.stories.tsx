import { Meta, StoryObj } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import LoginForm from './LoginForm'
import { loginReducer } from '../../model/slices/loginSlice'

const meta: Meta<typeof LoginForm> = {
  title: 'features/LoginForm',
  component: LoginForm,
}

export default meta
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {
  render: () => <LoginForm onSuccess={() => null} />,
  decorators: [
    (...args) =>
      StoreDecorator(...args)(
        { login: { error: undefined, isLoading: false } },
        { login: loginReducer }
      ),
  ],
}

export const WithError: Story = {
  render: () => <LoginForm onSuccess={() => null} />,
  decorators: [
    (...args) =>
      StoreDecorator(...args)(
        { login: { error: 'SERVER', isLoading: false } },
        { login: loginReducer }
      ),
  ],
}

export const WithLoading: Story = {
  render: () => <LoginForm onSuccess={() => null} />,
  decorators: [
    (...args) =>
      StoreDecorator(...args)(
        { login: { error: undefined, isLoading: true } },
        { login: loginReducer }
      ),
  ],
}
