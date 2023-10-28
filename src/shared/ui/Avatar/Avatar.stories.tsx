import { ComponentMeta } from '@storybook/react'
import { Avatar } from './Avatar'

export default {
  title: 'shared/Avatar',
  component: Avatar,
} as ComponentMeta<typeof Avatar>

const avatarUrl =
  /* eslint-disable-next-line */
  'https://images.unsplash.com/photo-1682687981974-c5ef2111640c?auto=format&fit=crop&q=80&w=240&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export const Sizes = () => (
  <div className='flex'>
    <Avatar
      src={avatarUrl}
      size='small'
    />
    <Avatar
      src={avatarUrl}
      size='default'
    />
    <Avatar
      src={avatarUrl}
      size='large'
    />
  </div>
)
