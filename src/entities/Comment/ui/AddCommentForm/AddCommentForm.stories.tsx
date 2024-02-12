import { Meta, StoryObj } from '@storybook/react'
import { AddCommentForm } from './AddCommentForm'

export default {
  title: 'entities/Comment/AddCommentForm',
  component: AddCommentForm,
} as Meta<typeof AddCommentForm>

type Story = StoryObj<typeof AddCommentForm>

export const Default: Story = {
  render: () => <AddCommentForm onCreate={() => null} />,
}
