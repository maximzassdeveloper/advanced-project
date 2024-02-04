import { FC, memo } from 'react'
import { ArticleSortBySelect, ArticlesSearch, ArticlesViewSelect } from '@/entities/Article'
import { Row } from '@/shared/ui'
import { useArticlesActions } from '../../model/hooks/useArticleActions'
import { useAppSelector, useDebounceCallback } from '@/shared/hooks'
import { allArticlesSelectors } from '../../model/slices/articlesSlice'
import { ArticleSortBy, ArticleView } from '@/entities/Article/model/const'

export const ArticlesFilters: FC = memo(() => {
  const { setSortBy, setView, setSearch, updateQueryParams, getArticles } = useArticlesActions()
  const sortBy = useAppSelector(allArticlesSelectors.getSortBySelector)
  const view = useAppSelector(allArticlesSelectors.getViewSelector)
  const search = useAppSelector(allArticlesSelectors.getSearchSelector)

  const sortByChangeHandler = (sortBy: ArticleSortBy) => {
    setSortBy(sortBy)
    getArticles()
    updateQueryParams()
  }

  const viewChangeHandler = (view: ArticleView) => {
    setView(view)
    updateQueryParams()
  }

  const debouncedGetArticles = useDebounceCallback(getArticles, 200)

  const searchChangeHandler = (value: string) => {
    setSearch(value)
    debouncedGetArticles()
    updateQueryParams()
  }

  return (
    <div className='mb-4'>
      <Row justify='between' className='mt-4 mb-3'>
        <ArticleSortBySelect value={sortBy} onChange={sortByChangeHandler} />
        <ArticlesViewSelect value={view} onChange={viewChangeHandler} />
      </Row>
      <ArticlesSearch value={search || ''} onChange={searchChangeHandler} />
    </div>
  )
})
