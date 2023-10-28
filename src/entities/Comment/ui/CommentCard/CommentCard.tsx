import { FC, memo } from 'react'
import { Comment } from '../../model/types/comment'
import { Avatar, Row, Title } from '@/shared/ui'
import s from './comment.module.scss'
import { classNames } from '@/shared/lib/classNames'

interface CommentCardProps {
  comment: Comment
}

export const CommentCard: FC<CommentCardProps> = memo((props) => {
  const { text, user } = props.comment

  return (
    <div className={s.comment}>
      <Row gap={16}>
        {!!user?.avatar && <Avatar src={user?.avatar} />}
        {!!user?.username && <Title level='h4'>{user?.username}</Title>}
      </Row>
      <p className={classNames(s.text, 'mt-3')}>{text}</p>
    </div>
  )
})
