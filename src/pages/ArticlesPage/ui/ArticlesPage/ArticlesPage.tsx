import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Title } from '@/shared/ui'
import { ArticlesList } from '@/entities/Article'
import { ArticlesFilters } from '../ArticlesFilters/ArticlesFilters'
import { useAppSelector, useLoadAsyncReducer } from '@/shared/hooks'
import {
  allArticlesSelectors,
  articlesReducer,
  articlesSelectors,
} from '../../model/slices/articlesSlice'
import { useArticlesActions } from '../../model/hooks/useArticleActions'
import { ArticlesPagination } from '../ArticlesPagination/ArticlesPagination'

const ArticlesPage: FC = () => {
  const { t } = useTranslation(['articles'])

  useLoadAsyncReducer('articles', articlesReducer)
  const articles = useAppSelector(articlesSelectors.selectAll)
  const isLoading = useAppSelector(allArticlesSelectors.getIsLoadingSelector)
  const view = useAppSelector(allArticlesSelectors.getViewSelector)
  const { getArticles, initParams } = useArticlesActions()

  useEffect(() => {
    getArticles()
    initParams()
  }, [getArticles, initParams])

  return (
    <div>
      <Title level='h2'>{t('articles:title', 'Список статей')}</Title>
      <ArticlesFilters />
      <ArticlesList articles={articles || []} isLoading={isLoading} view={view} />
      <ArticlesPagination />
    </div>
  )
}

export default ArticlesPage
