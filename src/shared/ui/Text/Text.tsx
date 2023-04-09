import { FC, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './text.module.scss'

type TextTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

interface TextProps {
  children: ReactNode
  tag?: TextTagType
  size?: 'm' | 'l'
  theme?: 'error' | 'success' | 'default'
  className?: string
}

export const Text: FC<TextProps> = (props) => {
  const { children, tag = 'p', size = 'm', theme = 'default', className } = props

  const Tag = tag

  return <Tag className={classNames(s.text, className, s[size], s[theme])}>{children}</Tag>
}
