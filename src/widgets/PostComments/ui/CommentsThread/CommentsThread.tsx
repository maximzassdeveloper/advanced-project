import { FC, memo, useMemo, useState } from 'react'
import { Dictionary } from '@reduxjs/toolkit'
import type { Comment } from '../../model/types/comment'
import { CommentItem } from '../CommentItem/CommentItem'
import s from './CommentsThread.module.scss'
import { Icon } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'

interface CommentsThreadProps {
  comment: Comment
  allComments: Dictionary<Comment>
  commentClassName?: string
}

export const CommentsThread: FC<CommentsThreadProps> = memo((props) => {
  const { comment, allComments, commentClassName } = props
  const [isOpen, setIsOpen] = useState(true)

  const childrenComments = useMemo(() => {
    return (comment.childrenIds?.filter((id) => !!allComments[id]).map((id) => allComments[id]) ||
      []) as Comment[]
  }, [comment, allComments])

  const isHaveChildrens = childrenComments.length > 0

  return (
    <div className={s.thread}>
      <div className={s.commentContainer}>
        <CommentItem comment={comment} className={commentClassName} />

        {isHaveChildrens && (
          <button className={s.toggler} onClick={() => setIsOpen((p) => !p)}>
            <Icon icon={isOpen ? 'ph ph-minus-circle' : 'ph ph-plus-circle'} />
          </button>
        )}
      </div>

      {isHaveChildrens && (
        <div className={s.childComments}>
          <span className={s.treeLine} />

          <div className={classNames({ [s.hidden]: !isOpen })}>
            {childrenComments.map((childComment) => (
              <CommentsThread
                key={childComment.id}
                comment={childComment}
                allComments={allComments}
                commentClassName={s.childComment}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
})
