import { FC, memo } from 'react'
import { ArticleSortBySelect, ArticlesViewSelect } from '@/entities/Article'
import { Row } from '@/shared/ui'
import { useArticlesActions } from '../../model/hooks/useArticleActions'
import { useAppSelector } from '@/shared/hooks'
import { allArticlesSelectors } from '../../model/slices/articlesSlice'
import { ArticleSortBy, ArticleView } from '@/entities/Article/model/const'

export const ArticlesFilters: FC = memo(() => {
  const { setSortBy, setView, getArticles } = useArticlesActions()
  const sortBy = useAppSelector(allArticlesSelectors.getSortBySelector)
  const view = useAppSelector(allArticlesSelectors.getViewSelector)

  const sortByChangeHandler = (sortBy: ArticleSortBy) => {
    setSortBy(sortBy)
    getArticles()
  }

  const viewChangeHandler = (view: ArticleView) => {
    setView(view)
  }

  return (
    <Row justify='between' className='mt-4 mb-4'>
      <ArticleSortBySelect value={sortBy} onChange={sortByChangeHandler} />
      <ArticlesViewSelect value={view} onChange={viewChangeHandler} />
    </Row>
  )
})
