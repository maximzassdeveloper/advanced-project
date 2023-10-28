import { FC } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './skeleton.module.scss'

interface SkeletonTextProps {
  rows?: number
  width?: number
  className?: string
}

export const SkeletonText: FC<SkeletonTextProps> = (props) => {
  const { rows = 1, width = 200, className } = props
  return (
    <div className={classNames(s.typography, className)}>
      {Array(rows)
        .fill(0)
        .map((_, index) => (
          <span
            key={index}
            className={s.skeleton}
            style={{ width }}
          />
        ))}
    </div>
  )
}
