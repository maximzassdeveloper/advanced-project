import { FC, HTMLAttributes, memo } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './icon.module.scss'

interface IconProps extends HTMLAttributes<HTMLElement> {
  icon: string
  hovered?: boolean
  className?: string
  weight?: 400 | 500 | 600 | 700
  size?: 'l' | 'm' | 's'
}

export const Icon: FC<IconProps> = memo((props) => {
  const { icon, hovered, size = 'm', weight = 400, className, ...rest } = props
  return (
    <i
      className={classNames(icon, s.icon, className, s[size], s[`weight${weight}`], {
        [s.hovered]: hovered,
      })}
      {...rest}
    />
  )
})
