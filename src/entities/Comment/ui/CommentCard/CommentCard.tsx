import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { Comment } from '../../model/types/comment'
import { Avatar, Row, Title } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import { routePaths } from '@/shared/config/routeConfig'
import s from './comment.module.scss'

interface CommentCardProps {
  comment: Comment
}

export const CommentCard: FC<CommentCardProps> = memo((props) => {
  const { text, user } = props.comment

  return (
    <div className={s.comment}>
      <Row gap={16}>
        {!!user?.avatar && <Avatar src={user?.avatar} />}
        {!!user?.username && (
          <Link to={routePaths.profile(user.id)}>
            <Title level='h4'>{user?.username}</Title>
          </Link>
        )}
      </Row>
      <p className={classNames(s.text, 'mt-3')}>{text}</p>
    </div>
  )
})
