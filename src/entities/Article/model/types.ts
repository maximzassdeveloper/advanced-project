export enum ArticleBlockType {
  CODE = 'CODE',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

interface IArticleBaseBlock {
  id: string
  type: ArticleBlockType
}

export interface IArticleBlockText extends IArticleBaseBlock {
  type: ArticleBlockType.TEXT
  title: string
  paragraphs: string[]
}

export interface IArticleBlockCode extends IArticleBaseBlock {
  type: ArticleBlockType.CODE
  code: string
}

export interface IArticleBlockImage extends IArticleBaseBlock {
  type: ArticleBlockType.IMAGE
  src: string
  title: string
  alt?: string
}

export type IArticleBlock = IArticleBlockText | IArticleBlockCode | IArticleBlockImage

export interface Article {
  id: string
  slug: string
  title: string
  subtitle: string
  preview: string
  views: number
  createdAt: string
  blocks: IArticleBlock[]
}
