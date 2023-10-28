import { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Row, Spinner } from '@/shared/ui'
import { Comment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'
import { CommentCardSkeleton } from '../CommentCard/CommentCardSkeleton'

interface CommentListProps {
  comments: Comment[]
  isLoading?: boolean
}

export const CommentList: FC<CommentListProps> = memo((props) => {
  const { comments, isLoading } = props
  const { t } = useTranslation(['comments'])

  return (
    <Row
      direction='column'
      gap={4}
    >
      {isLoading ? (
        Array(5)
          .fill(0)
          .map((_, index) => <CommentCardSkeleton key={index} />)
      ) : comments?.length === 0 ? (
        <p>{t('comments:notFound', 'Комментариев нет')}</p>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
          />
        ))
      )}
    </Row>
  )
})
