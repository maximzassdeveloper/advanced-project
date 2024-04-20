import { HTMLAttributes, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './typography.module.scss'

export type TextSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl'
export type TextWeight = '400' | '500' | '600' | '700' | '800'

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: TextSize
  weight?: TextWeight
  theme?: 'error' | 'success' | 'default'
  className?: string
  children: ReactNode
}

export const Text = (props: TextProps) => {
  const { children, size = 'm', weight = '500', theme = 'default', className, ...rest } = props

  return (
    <p
      className={classNames(s.text, className, s[size], s[`weight-${weight}`], s[theme])}
      {...rest}
    >
      {children}
    </p>
  )
}
