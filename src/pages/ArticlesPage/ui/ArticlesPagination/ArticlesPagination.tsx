import { FC, memo } from 'react'
import { useAppSelector } from '@/shared/hooks'
import { Pagination } from '@/shared/ui'
import { allArticlesSelectors } from '../../model/slices/articlesSlice'
import { useArticlesActions } from '../../model/hooks/useArticleActions'

export const ArticlesPagination: FC = memo(() => {
  const page = useAppSelector(allArticlesSelectors.getPageSelector)
  const first = useAppSelector(allArticlesSelectors.getFirstSelector)
  const last = useAppSelector(allArticlesSelectors.getLastSelector)
  const { setPage, getArticles, updateQueryParams } = useArticlesActions()

  const pageChangeHandler = (p: number) => {
    setPage(p)
    getArticles()
    updateQueryParams()
  }

  return (
    <Pagination
      className='mb-4'
      onClick={pageChangeHandler}
      current={page}
      first={first}
      last={last}
    />
  )
})
