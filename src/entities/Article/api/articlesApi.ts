import { rtkApi } from '@/shared/api/rtkApi'
import { Article, ArticleCategory } from '../model/types'
import { ArticleSortBy } from '../model/const'

export interface GetArticlesParams {
  sortBy?: ArticleSortBy
  category?: ArticleCategory
  search?: string
  page?: number
  limit?: number
}

const articlesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<Article[], GetArticlesParams>({
      query: (params) => ({
        url: '/articles',
        params: {
          _sort: params.sortBy === ArticleSortBy.CREATED_AT ? 'created_at' : 'views',
          _order: 'asc',
          _expand: 'user',
          _page: params.page,
          _limit: params.limit,
          category: params.category,
          q: params.search,
        },
      }),
    }),

    getArticleById: build.query<Article, string>({
      query: (id: string) => `/articles/${id}`,
    }),
  }),
})

export const { useGetArticlesQuery, useGetArticleByIdQuery } = articlesApi
