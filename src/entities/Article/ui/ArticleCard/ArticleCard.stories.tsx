import { ComponentMeta, StoryObj } from '@storybook/react'
import { ArticleCard } from './ArticleCard'
import { Article } from '../../model/types'
import { ArticleCardSkeleton } from './ArticleCardSkeleton'

export default {
  title: 'entities/Article/ArticleCard',
  component: ArticleCard,
} as ComponentMeta<typeof ArticleCard>

const exampleArticle: Article = {
  id: '1',
  title: 'Test article',
  slug: 'test-article',
  subtitle:
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis, velit, pariatur voluptatum, libero animi suscipit ut blanditiis esse ratione harum dolorem! Ex dicta officiis voluptatem illum repellat suscipit laudantium voluptatum.',
  preview:
    'https://images.unsplash.com/photo-1682687981974-c5ef2111640c?auto=format&fit=crop&q=80&w=240&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  views: 1022,
  createdAt: '26.02.2022',
  blocks: [],
}

type Story = StoryObj<typeof ArticleCard>

export const Default: Story = {
  render: () => <ArticleCard article={exampleArticle} />,
}

export const Skeleton: Story = {
  render: () => <ArticleCardSkeleton />,
}
