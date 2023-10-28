import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Article } from '../../model/types'
import { Result, Spinner } from '@/shared/ui'
import { ArticleCard } from '../ArticleCard/ArticleCard'

interface ArticlesListProps {
  articles: Article[]
  isLoading?: boolean
}

export const ArticlesList: FC<ArticlesListProps> = memo((props) => {
  const { articles, isLoading } = props
  const { t } = useTranslation(['articles'])

  return (
    <div>
      {isLoading ? (
        <Spinner fullPage />
      ) : articles.length === 0 ? (
        <Result
          status='default'
          title={t('articles:listNotFound', 'Статей не найдено')}
        />
      ) : (
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
          />
        ))
      )}
    </div>
  )
})
