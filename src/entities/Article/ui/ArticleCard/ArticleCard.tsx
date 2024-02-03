import { FC, memo } from 'react'
import { Article } from '../../model/types'
import { ArticleView } from '../../model/const'
import { ArticleCardGrid } from './ArticleCardGrid'
import { ArticleCardList } from './ArticleCardList'

interface ArticleCardProps {
  article: Article
  view?: ArticleView
  className?: string
}

export const ArticleCard: FC<ArticleCardProps> = memo((props) => {
  const { article, view = ArticleView.GRID, className } = props

  const renderContent = () => {
    switch (view) {
      case ArticleView.GRID:
        return <ArticleCardGrid article={article} className={className} />
      case ArticleView.LIST:
        return <ArticleCardList article={article} className={className} />
      default:
        return null
    }
  }

  return renderContent()
})
