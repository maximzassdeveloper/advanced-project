import { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { routePaths } from '@/shared/config/routeConfig'
import { Avatar, Image, Row, Text, Title } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import { ArticleBlock } from '../ArticleBlock/ArticleBlock'
import { Article } from '../../model/types'
import { ArticleBlockType } from '../../model/const'
import s from './article-card.module.scss'

interface ArticleCardListProps {
  article: Article
  className?: string
}

export const ArticleCardList: FC<ArticleCardListProps> = (props) => {
  const { article, className } = props
  const { id, blocks, preview, user, title, views, createdAt, subtitle } = article

  const firstTextBlock = useMemo(() => {
    return blocks.find((i) => i.type === ArticleBlockType.TEXT)
  }, [blocks])

  return (
    <article className={classNames(s.article, s.listView, className)}>
      {user && (
        <Row gap={8}>
          <Avatar src={user.avatar ?? ''} size='small' />
          <Title level='h5'>{user.username}</Title>
        </Row>
      )}

      <Title level='h3'>
        <Link to={routePaths.articleDetails(id)}>{title}</Link>
      </Title>

      <Row gap={8}>
        <span>{views}</span>
        <span>{createdAt}</span>
      </Row>

      <Text>{subtitle}</Text>
      <Image className={s.preview} src={preview} alt={title} />

      {!!firstTextBlock && (
        <div className={s.textBlock}>
          <ArticleBlock block={firstTextBlock} />
        </div>
      )}
    </article>
  )
}
