import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Result, Spinner, Title } from '@/shared/ui'
import { useGetArticleByIdQuery } from '../../api/articlesApi'
import { ArticleBlock } from '../ArticleBlock/ArticleBlock'

interface ArticleDetailsProps {
  id: string
}

export const ArticleDetails: FC<ArticleDetailsProps> = memo((props) => {
  const { id } = props
  const { t } = useTranslation(['articleDetails'])
  const { data: article, isLoading } = useGetArticleByIdQuery(id)

  return isLoading ? (
    <Spinner fullPage />
  ) : article ? (
    <div>
      <Title level='h1'>{article.title}</Title>
      <Image
        src={article.preview}
        alt={article.title}
      />
      <p>{article.subtitle}</p>
      <span>{article.views}</span>
      <span>{article.createdAt}</span>

      {article.blocks?.map((block) => (
        <ArticleBlock
          key={block.id}
          block={block}
        />
      ))}
    </div>
  ) : (
    <Result
      status='error'
      title={t('articleDetails:notLoad', 'Статья не была загружена')}
    />
  )
})
