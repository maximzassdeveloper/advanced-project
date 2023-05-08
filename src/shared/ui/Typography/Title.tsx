import { HTMLAttributes, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './typography.module.scss'

type TitleLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
type TitleSizes = 'xl' | 'l' | 'm' | 's'

const levelDefaultSizeMap: Record<TitleLevels, TitleSizes> = {
  h1: 'xl',
  h2: 'l',
  h3: 'm',
  h4: 's',
  h5: 's',
}

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: TitleLevels
  size?: 'xl' | 'l' | 'm' | 's'
  theme?: 'error' | 'success' | 'default'
  className?: string
  children: ReactNode
}

export const Title = (props: TitleProps) => {
  const { children, level = 'h3', size, theme = 'default', className, ...rest } = props

  const Tag = level

  const defaultSize = size ?? levelDefaultSizeMap[level] ?? 'm'
  const classes = classNames(s.title, className, s[defaultSize], s[theme])

  return (
    <Tag
      className={classes}
      {...rest}
    >
      {children}
    </Tag>
  )
}
