import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './Badge.module.scss'

interface BadgeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const Badge: FC<BadgeProps> = (props) => {
  const { children, className, ...rest } = props

  return (
    <button className={classNames(s.badge, className)} {...rest}>
      {children}
    </button>
  )
}
