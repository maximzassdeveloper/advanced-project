import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from '../../model/types'
import { Result, Spinner } from '@/shared/ui'
import { ArticleCard } from '../ArticleCard/ArticleCard'
import { ArticleView } from '../../model/const'
import { classNames } from '@/shared/lib/classNames'
import s from './articles-list.module.scss'

interface ArticlesListProps {
  articles: Article[]
  isLoading?: boolean
  view?: ArticleView
}

export const ArticlesList: FC<ArticlesListProps> = memo((props) => {
  const { articles, isLoading, view = ArticleView.LIST } = props
  const { t } = useTranslation(['articles'])

  return (
    <div
      className={classNames(s.list, {
        [s.grid]: view === ArticleView.GRID,
      })}
    >
      {isLoading ? (
        <Spinner fullPage />
      ) : articles.length === 0 ? (
        <Result status='default' title={t('articles:listNotFound', 'Статей не найдено')} />
      ) : (
        articles.map((article) => <ArticleCard key={article.id} article={article} view={view} />)
      )}
    </div>
  )
})
