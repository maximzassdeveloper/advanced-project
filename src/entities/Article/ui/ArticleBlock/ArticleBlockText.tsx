import { FC } from 'react'
import { Title } from '@/shared/ui'
import { IArticleBlockText } from '../../model/types'
import s from './article-block.module.scss'

interface ArticleBlockTextProps {
  block: IArticleBlockText
}

export const ArticleBlockText: FC<ArticleBlockTextProps> = (props) => {
  const { title, paragraphs } = props.block

  return (
    <div className={s.block}>
      <Title level='h3'>{title}</Title>
      {paragraphs.map((par, index) => (
        <p key={index}>{par}</p>
      ))}
    </div>
  )
}
