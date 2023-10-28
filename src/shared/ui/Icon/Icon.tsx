import { FC, HTMLAttributes, memo } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './icon.module.scss'

interface IconProps extends HTMLAttributes<HTMLElement> {
  icon: string
  hovered?: boolean
  className?: string
  size?: 'l' | 'm' | 's'
}

export const Icon: FC<IconProps> = memo((props) => {
  const { icon, hovered, size = 'm', className, ...rest } = props
  return (
    <i
      className={classNames(icon, s.icon, className, s[size], { [s.hovered]: hovered })}
      {...rest}
    />
  )
})
