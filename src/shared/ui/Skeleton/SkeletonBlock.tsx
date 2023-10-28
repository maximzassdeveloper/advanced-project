import { FC } from 'react'
import s from './skeleton.module.scss'
import { classNames } from '@/shared/lib/classNames'

interface SkeletonBlockProps {
  className?: string
  width: number
  height: number
  borderRadius?: number
}

export const SkeletonBlock: FC<SkeletonBlockProps> = (props) => {
  const { height, width, borderRadius = 10, className } = props
  return (
    <span
      className={classNames(s.skeleton, className)}
      style={{ width, height, borderRadius }}
    />
  )
}
