import { User } from '@/entities/User'
import { ArticleBlockType } from './const'

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

export type ArticleCategory = {
  id: string
  slug: string
  name: string
}

export interface Article {
  id: string
  slug: string
  title: string
  subtitle: string
  preview: string

  views: number
  readTime?: number
  createdAt: string
  category: ArticleCategory

  blocks?: IArticleBlock[]
  user?: User
}
