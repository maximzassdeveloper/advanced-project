import { FC } from 'react'
import { ArticleCategoryList, useGetCategoriesQuery } from '@/entities/ArticleCategory'

export const ArticleCategories: FC = () => {
  const { data, isLoading } = useGetCategoriesQuery()

  return <ArticleCategoryList categories={data ?? []} isLoading={isLoading} />
}
