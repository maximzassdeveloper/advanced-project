import { FC } from 'react'
import { formatDistance, formatRelative } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Comment } from '../../model/types/comment'
import { Icon, Popover } from '@/shared/ui'
import { Badge } from '../Badge/Badge'
import { classNames } from '@/shared/lib/classNames'
import { Karma } from '../Karma/Karma'
import s from './CommentItem.module.scss'
import { UserPreview } from '../UserPreview/UserPreview'
import { useAppDispatch } from '@/shared/hooks'
import { addReaction } from '../../model/slices/commentsSlice'

interface CommentItemProps {
  comment: Comment
  className?: string
}

export const CommentItem: FC<CommentItemProps> = (props) => {
  const { comment, className } = props
  const { id, user, karma, createdAt, content, votes } = comment
  const dispath = useAppDispatch()

  const changeKaramsHandler = (newKarma: Comment['karma']) => {
    dispath(addReaction({ id, karma: newKarma }))
  }

  return (
    <article className={classNames(s.comment, className)}>
      {/* <UserPreview username={user.username}> */}
      <img
        className={s.avatar}
        src={user.avatar}
        alt={`Аватар пользователя ${user.username}`}
        width={40}
        height={40}
      />
      {/* </UserPreview> */}

      <div>
        <div className={s.header}>
          <h4 className={s.username}>{user.username}</h4>
          <span className={s.createdAt}>
            {formatRelative(new Date(createdAt), new Date(), { locale: ru })}
          </span>
        </div>

        <div>
          <p>{content}</p>
        </div>

        <div className={s.tools}>
          <Karma
            karma={karma}
            upVoted={votes.upVoted}
            downVoted={votes.downVoted}
            onKarmaDown={changeKaramsHandler}
            onKarmaUp={changeKaramsHandler}
          />

          <Badge>
            <Icon icon='ph ph-chat' />
            Ответить
          </Badge>

          <Popover
            className={s.additionalTools}
            align='start'
            offset={0}
            content={
              <ul>
                <li>
                  <Badge>
                    <Icon icon='ph ph-share-network' />
                    Поделиться
                  </Badge>
                </li>
              </ul>
            }
          >
            <Badge>
              <Icon icon='ph ph-dots-three' />
            </Badge>
          </Popover>
        </div>
      </div>
    </article>
  )
}
