import { CSSProperties, useMemo } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './avatar.module.scss'

type AvatarSize = number | 'small' | 'default' | 'large'

interface AvatarProps {
  className?: string
  src?: string
  alt?: string
  size?: AvatarSize
}

export const Avatar = (props: AvatarProps) => {
  const { src = '', alt = '', size = 'default', className } = props

  const style = useMemo(() => {
    if (typeof size === 'number') {
      return { width: `${size}px`, height: `${size}px` } as CSSProperties
    }
    return {}
  }, [size])

  const classes = classNames(s.image, className, { [s[size]]: typeof size === 'string' })

  return <img className={classes} style={style} src={src} alt={alt} />
}
