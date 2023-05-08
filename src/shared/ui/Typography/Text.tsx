import { HTMLAttributes, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './typography.module.scss'

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: 'l' | 'm' | 's'
  theme?: 'error' | 'success' | 'default'
  className?: string
  children: ReactNode
}

export const Text = (props: TextProps) => {
  const { children, size = 'm', theme = 'default', className, ...rest } = props

  return (
    <p
      className={classNames(s.text, className, s[size], s[theme])}
      {...rest}
    >
      {children}
    </p>
  )
}
