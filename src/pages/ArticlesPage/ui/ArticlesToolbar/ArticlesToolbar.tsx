import { FC } from 'react'
import {
  ArticleSortBySelect,
  ArticleView,
  ArticlesSearch,
  ArticlesViewSelect,
} from '@/entities/Article'
import { ArticleSortBy } from '@/entities/Article/model/const'
import { useAppSelector, useDebounceCallback } from '@/shared/hooks'
import { allArticlesSelectors } from '../../model/slices/articlesSlice'
import { useArticlesActions } from '../../model/hooks/useArticleActions'
import s from './articles-toolbar.module.scss'

export const ArticlesToolbar: FC = () => {
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
    <div className={s.toolbar}>
      <ArticlesSearch className='mr-auto' value={search || ''} onChange={searchChangeHandler} />
      <ArticleSortBySelect value={sortBy} onChange={sortByChangeHandler} />
      <ArticlesViewSelect className='ml-48' value={view} onChange={viewChangeHandler} />
    </div>
  )
}
