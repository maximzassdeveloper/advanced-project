import { FC, memo } from 'react'
import { IArticleBlockCode } from '../../model/types'
import s from './article-block.module.scss'
import { Code } from '@/shared/ui'

interface ArticleBlockCodeProps {
  block: IArticleBlockCode
}

export const ArticleBlockCode: FC<ArticleBlockCodeProps> = (props) => {
  const { code } = props.block

  return (
    <div className={s.block}>
      <Code code={code} />
    </div>
  )
}
