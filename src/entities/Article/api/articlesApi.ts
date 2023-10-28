import { rtkApi } from '@/shared/api/rtkApi'
import { Article } from '../model/types'

const articlesApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticles: build.query<Article[], void>({
      query: () => '/articles',
    }),
    getArticleById: build.query<Article, string>({
      query: (id: string) => `/articles/${id}`,
    }),
  }),
})

export const { useGetArticlesQuery, useGetArticleByIdQuery } = articlesApi
