import { FC, memo, useMemo } from 'react'
import { fakeComments } from '../../fakeData'
import { CommentsThread } from '../CommentsThread/CommentsThread'
import s from './PostComments.module.scss'
import { useAppSelector } from '@/shared/hooks'
import { selectCommentsEntities } from '../../model/slices/commentsSlice'
import { Comment } from '../../model/types/comment'

export const PostComments: FC = memo(() => {
  const commentsEntities = useAppSelector(selectCommentsEntities)

  const highLevelComments = useMemo(
    () =>
      Object.values(commentsEntities).filter(
        (comment) => !!comment && comment?.parentId === undefined
      ) as unknown as Comment[],
    [commentsEntities]
  )

  return (
    <div className={s.container}>
      {highLevelComments.map((comment) => (
        <CommentsThread key={comment.id} comment={comment} allComments={commentsEntities} />
      ))}
    </div>
  )
})
