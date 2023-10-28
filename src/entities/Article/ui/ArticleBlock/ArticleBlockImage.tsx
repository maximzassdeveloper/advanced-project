import { FC } from 'react'
import { Title } from '@/shared/ui'
import { IArticleBlockImage } from '../../model/types'
import s from './article-block.module.scss'

interface ArticleBlockImageProps {
  block: IArticleBlockImage
}

export const ArticleBlockImage: FC<ArticleBlockImageProps> = (props) => {
  const { title, src, alt } = props.block

  return (
    <div className={s.block}>
      <img
        src={src}
        alt={alt ?? title}
      />
      <Title level='h4'>{title}</Title>
    </div>
  )
}
