import { FC } from 'react'
import { Skeleton } from '@/shared/ui'

export const ArticleCardSkeleton: FC = () => {
  return (
    <div>
      <Skeleton.Block
        width={250}
        height={240}
        borderRadius={5}
        className='mb-3'
      />
      <Skeleton.Typography width={200} />
    </div>
  )
}
