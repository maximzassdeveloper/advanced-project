import { rtkApi } from '@/shared/api/rtkApi'
import { ArticleCategory } from '../model/types'

const articleCategoryApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<ArticleCategory[], void>({
      query: () => ({
        url: '/categories',
      }),
    }),
  }),
})

export const { useGetCategoriesQuery } = articleCategoryApi
