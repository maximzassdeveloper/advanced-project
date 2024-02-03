import { FC, memo, useMemo } from 'react'
import { IArticleBlock } from '../../model/types'
import { ArticleBlockType } from '../../model/const'
import { ArticleBlockText } from './ArticleBlockText'
import { ArticleBlockCode } from './ArticleBlockCode'
import { ArticleBlockImage } from './ArticleBlockImage'

interface ArticleBlockProps {
  block: IArticleBlock
}

export const ArticleBlock: FC<ArticleBlockProps> = memo((props) => {
  const { block } = props

  const renderBlock = useMemo(() => {
    switch (block.type) {
      case ArticleBlockType.TEXT:
        return <ArticleBlockText block={block} />
      case ArticleBlockType.CODE:
        return <ArticleBlockCode block={block} />
      case ArticleBlockType.IMAGE:
        return <ArticleBlockImage block={block} />
      default:
        return null
    }
  }, [block])

  return renderBlock
})
