import { FC } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './skeleton.module.scss'

interface SkeletonAvatarProps {
  size?: 'small' | 'default' | 'large'
  className?: string
}

export const SkeletonAvatar: FC<SkeletonAvatarProps> = (props) => {
  const { size = 'default', className } = props
  return <span className={classNames(s.skeleton, s.avatar, s[`avatar-${size}`], className)} />
}
