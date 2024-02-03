import { EntityState } from '@reduxjs/toolkit'
import { Article, ArticleCategory, ArticleView } from '@/entities/Article'
import { ArticleSortBy } from '@/entities/Article/model/const'

export interface ArticlesSchema extends EntityState<Article> {
  isLoading: boolean
  error: string | undefined

  view: ArticleView
  sortBy: ArticleSortBy
  search: string | undefined
  category: ArticleCategory | undefined

  limit: number
  page: number
  last: number
  first: number
}
