import { FC } from 'react'
import { Link } from 'react-router-dom'
import { routePaths } from '@/shared/config/routeConfig'
import { Image, Title } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import { Article } from '../../model/types'
import s from './article-card.module.scss'

interface ArticleCardGridProps {
  article: Article
  className?: string
}

export const ArticleCardGrid: FC<ArticleCardGridProps> = (props) => {
  const { article, className } = props
  const { id, preview, title } = article

  return (
    <article className={classNames(s.article, className)}>
      <Link to={routePaths.articleDetails(id)}>
        <Image className={s.image} src={preview} alt={`${title} Preview`} />
      </Link>

      <Link to={routePaths.articleDetails(id)}>
        <Title level='h3'>{title}</Title>
      </Link>
    </article>
  )
}
