import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { Image, Title } from '@/shared/ui'
import { routePaths } from '@/shared/config/routeConfig'
import { Article } from '../../model/types'
import s from './article-card.module.scss'

interface ArticleCardProps {
  article: Article
}

export const ArticleCard: FC<ArticleCardProps> = memo((props) => {
  const { preview, title, id } = props.article

  return (
    <article className={s.article}>
      <Link to={routePaths.articleDetails(id)}>
        <Image
          className={s.image}
          src={preview}
          alt={`${title} Preview`}
        />
      </Link>

      <Link to={routePaths.articleDetails(id)}>
        <Title level='h3'>{title}</Title>
      </Link>
    </article>
  )
})
