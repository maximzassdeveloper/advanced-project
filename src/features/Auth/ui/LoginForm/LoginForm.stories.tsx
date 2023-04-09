import { ComponentStory, ComponentMeta } from '@storybook/react'
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator'
import LoginForm from './LoginForm'
import { loginReducer } from '../../model/slices/loginSlice'

export default {
  title: 'features/LoginForm',
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />

export const Default = Template.bind({})
Default.decorators = [
  StoreDecorator({ login: { error: undefined, isLoading: false } }, { login: loginReducer }),
]

export const WithError = Template.bind({})
WithError.decorators = [
  StoreDecorator({ login: { error: 'SERVER', isLoading: false } }, { login: loginReducer }),
]

export const WithLoading = Template.bind({})
WithLoading.decorators = [
  StoreDecorator({ login: { error: undefined, isLoading: true } }, { login: loginReducer }),
]
