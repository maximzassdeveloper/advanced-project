import { FC } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './spinner.module.scss'

interface SpinnerProps {
  className?: string
  containerClassName?: string
  fullPage?: boolean
  size?: 'small' | 'middle'
  color?: 'white' | 'default'
}

export const Spinner: FC<SpinnerProps> = (props) => {
  const { className, containerClassName, size = 'middle', color = 'default', fullPage } = props

  return (
    <span className={classNames(containerClassName, { [s.fullPage]: fullPage })}>
      <span className={classNames(s.loader, className, s[size], s[color])} />
    </span>
  )
}
