import { FC, memo } from 'react'
import { useAppSelector } from '@/shared/hooks'
import { Pagination } from '@/shared/ui'
import { allArticlesSelectors } from '../../model/slices/articlesSlice'
import { useArticlesActions } from '../../model/hooks/useArticleActions'

export const ArticlesPagination: FC = memo(() => {
  const page = useAppSelector(allArticlesSelectors.getPageSelector)
  const first = useAppSelector(allArticlesSelectors.getFirstSelector)
  const last = useAppSelector(allArticlesSelectors.getLastSelector)
  const { setPage } = useArticlesActions()

  return <Pagination onClick={setPage} current={page} first={first} last={last} />
})
