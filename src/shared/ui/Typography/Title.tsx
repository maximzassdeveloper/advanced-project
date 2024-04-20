import { HTMLAttributes, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames'
import { TextSize, TextWeight } from './Text'
import s from './typography.module.scss'

type TitleLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const levelDefaultSizeMap: Record<TitleLevels, TextSize> = {
  h1: 'xl',
  h2: 'l',
  h3: 'm',
  h4: 's',
  h5: 'xs',
  h6: 'xxs',
}

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: TitleLevels
  size?: TextSize
  weight?: TextWeight
  theme?: 'error' | 'success' | 'default'
  className?: string
  children: ReactNode
}

export const Title = (props: TitleProps) => {
  const {
    children,
    level = 'h3',
    size,
    weight = '800',
    theme = 'default',
    className,
    ...rest
  } = props

  const Tag = level

  const defaultSize = size ?? levelDefaultSizeMap[level] ?? 'm'
  const classes = classNames(s.title, className, s[defaultSize], s[`weight-${weight}`], s[theme])

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}
