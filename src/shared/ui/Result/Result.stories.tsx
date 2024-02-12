import { ComponentStory, Meta } from '@storybook/react'
import { Result } from './Result'
import { Button } from '@/shared/ui'

export default {
  title: 'shared/Result',
  component: Result,
} as Meta<typeof Result>

const Template: ComponentStory<typeof Result> = (args) => <Result {...args} />

export const Default = Template.bind({})
Default.args = {
  title: 'Обычный заголовок',
  desc: 'Описание к обычному заголовку',
  extra: <Button>Перейти</Button>,
}

export const Success = Template.bind({})
Success.args = {
  status: 'success',
  title: 'Успешная операция',
  desc: 'Операция прошла успешно, можете двигаться дальше',
  extra: <Button>Перейти</Button>,
}

export const Warning = Template.bind({})
Warning.args = {
  status: 'warning',
  title: 'Напоминаем, вам нужно заполнить поля',
}

export const Error = Template.bind({})
Error.args = {
  status: 'error',
  title: 'Операция не удалась',
  desc: 'Произошла ошибка, попробуйте обновить страницу',
  extra: <Button>Обновить</Button>,
}
