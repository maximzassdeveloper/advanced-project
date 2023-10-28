import { ComponentMeta, StoryObj } from '@storybook/react'
import { CommentCard } from './CommentCard'
import { Comment } from '../../model/types/comment'
import { CommentCardSkeleton } from './CommentCardSkeleton'

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
} as ComponentMeta<typeof CommentCard>

const exampleComment: Comment = {
  id: '1',
  articleId: '1',
  createdAt: 'Sun Oct 16 2023 19:21:15 GMT+0300 (GMT+03:00)',
  text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic perferendis commodi aut quasi illum enim. Fugiat labore sequi cupiditate totam?',
  user: {
    id: '2',
    username: 'admin',
    avatar:
      'https://images.unsplash.com/photo-1682687981974-c5ef2111640c?auto=format&fit=crop&q=80&w=240&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
}

type Story = StoryObj<typeof CommentCard>

export const Default: Story = {
  render: () => <CommentCard comment={exampleComment} />,
}

export const Skeleton: Story = {
  render: () => <CommentCardSkeleton />,
}
