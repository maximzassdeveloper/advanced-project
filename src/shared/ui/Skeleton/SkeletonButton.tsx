import { FC } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './skeleton.module.scss'

type ButtonSize = 'l' | 'm' | 's'

interface SkeletonButtonProps {
  size?: ButtonSize
  className?: string
}

export const SkeletonButton: FC<SkeletonButtonProps> = (props) => {
  const { size = 'm', className } = props
  return <span className={classNames(s.skeleton, s[`button-${size}`], className)} />
}
