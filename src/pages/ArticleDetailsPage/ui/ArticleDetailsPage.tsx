import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { ArticleDetails } from '@/entities/Article'
import { Page, Result } from '@/shared/ui'
import { ArticleComments } from '@/features/ArticleComments'

const ArticleDetailsPage: FC = () => {
  const { t } = useTranslation(['articleDetails'])
  const { id } = useParams<{ id: string }>()

  if (!id) {
    return (
      <Page>
        <Result
          status='error'
          title={t('articleDetails:notFound', 'Такая статья не найдена')}
        />
      </Page>
    )
  }

  return (
    <Page>
      <ArticleDetails id={id} />
      <ArticleComments articleId={id} />
    </Page>
  )
}

export default ArticleDetailsPage
