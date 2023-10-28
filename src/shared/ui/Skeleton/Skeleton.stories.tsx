import { ComponentMeta, StoryObj } from '@storybook/react'
import Skeleton from '.'

export default {
  title: 'shared/Skeleton',
  component: Skeleton.Button,
} as ComponentMeta<typeof Skeleton.Button>

type Story = StoryObj<typeof Skeleton.Button>

export const SkeletonButtons: Story = {
  render: () => (
    <div className='flex'>
      <Skeleton.Button size='l' />
      <Skeleton.Button size='m' />
      <Skeleton.Button size='s' />
    </div>
  ),
}

export const SkeletonTypography: Story = {
  render: () => (
    <div className='flex column'>
      <Skeleton.Typography
        rows={2}
        width={400}
      />
      <Skeleton.Typography
        rows={3}
        width={300}
      />
    </div>
  ),
}

export const SkeletonAvatars: Story = {
  render: () => (
    <div className='flex'>
      <Skeleton.Avatar size='large' />
      <Skeleton.Avatar size='default' />
      <Skeleton.Avatar size='small' />
    </div>
  ),
}

export const SkeletonBlocks: Story = {
  render: () => (
    <div className='flex'>
      <Skeleton.Block
        width={200}
        height={200}
        borderRadius={30}
      />
      <Skeleton.Block
        width={100}
        height={100}
        borderRadius={10}
      />
    </div>
  ),
}

export const CombinedSkeleton: Story = {
  render: () => (
    <div>
      <div className='flex mb-3 align-center'>
        <Skeleton.Avatar />
        <Skeleton.Typography
          rows={1}
          width={300}
        />
      </div>
      <Skeleton.Typography
        className='mb-3'
        rows={4}
        width={500}
      />
      <Skeleton.Button />
    </div>
  ),
}
