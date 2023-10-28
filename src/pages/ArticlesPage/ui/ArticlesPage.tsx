import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Title } from '@/shared/ui'
import { ArticlesList, useGetArticlesQuery } from '@/entities/Article'

const ArticlesPage: FC = () => {
  const { t } = useTranslation(['articles'])
  const { data: articles, isLoading } = useGetArticlesQuery()

  return (
    <div>
      <Title level='h2'>{t('articles:title', 'Список статей')}</Title>
      <ArticlesList articles={articles || []} isLoading={isLoading} />
    </div>
  )
}

export default ArticlesPage
