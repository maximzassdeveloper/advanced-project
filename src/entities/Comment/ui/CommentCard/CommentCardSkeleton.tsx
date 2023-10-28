import { FC } from 'react'
import { Row, Skeleton } from '@/shared/ui'

export const CommentCardSkeleton: FC = () => {
  return (
    <div>
      <Row
        align='center'
        gap={16}
        className='mb-3'
      >
        <Skeleton.Avatar />
        <Skeleton.Typography
          rows={1}
          width={200}
        />
      </Row>
      <Skeleton.Typography
        className='mb-3'
        rows={3}
        width={600}
      />
    </div>
  )
}
