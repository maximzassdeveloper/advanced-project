import { FC } from 'react'
import { Row, Spinner } from '@/shared/ui'
import { ArticleCategory } from '../model/types'
import { ArticleCategoryItem } from './ArticleCategoryItem'

interface ArticleCategoryListProps {
  categories: ArticleCategory[]
  isLoading?: boolean
  className?: string
}

export const ArticleCategoryList: FC<ArticleCategoryListProps> = (props) => {
  const { categories, isLoading, className } = props

  return (
    <Row direction='column' gap={16} className={className}>
      {isLoading ? (
        <Spinner />
      ) : (
        categories.map((category) => <ArticleCategoryItem key={category.id} category={category} />)
      )}
    </Row>
  )
}
