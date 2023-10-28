import { FC, memo, useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector, useLoadAsyncReducer } from '@/shared/hooks'
import { Title } from '@/shared/ui'
import { commentsReducer, commentsSelectors } from '../model/slices/commentsSlice'
import { fetchComments } from '../model/services/fetchComments'
import { AddCommentForm, AddCommentFormFields, CommentList } from '@/entities/Comment'
import { addComment } from '../model/services/addComment'

interface ArticleCommentsProps {
  articleId: string
}

export const ArticleComments: FC<ArticleCommentsProps> = memo((props) => {
  const { articleId } = props
  useLoadAsyncReducer('comments', commentsReducer)

  const comments = useAppSelector(commentsSelectors.selectAll)
  const isLoading = useAppSelector((state) => state.comments?.isLoading)
  const isLoadingAddComment = useAppSelector((state) => state.comments?.isLoadingAddComment)
  const dispatch = useAppDispatch()

  const onAddComment = useCallback(
    (values: AddCommentFormFields) => {
      dispatch(addComment({ ...values, articleId }))
    },
    [articleId, dispatch]
  )

  useEffect(() => {
    dispatch(fetchComments(articleId))
  }, [articleId, dispatch])

  return (
    <div>
      <AddCommentForm
        onCreate={onAddComment}
        isLoading={isLoadingAddComment}
      />
      <CommentList
        comments={comments}
        isLoading={isLoading}
      />
    </div>
  )
})
