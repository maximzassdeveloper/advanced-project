import { FC } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './spinner.module.scss'

interface SpinnerProps {
  className?: string
  containerClassName?: string
  fullPage?: boolean
}

export const Spinner: FC<SpinnerProps> = (props) => {
  const { className, containerClassName, fullPage } = props

  return (
    <div className={classNames(containerClassName, { [s.fullPage]: fullPage })}>
      <div className={classNames(s.loader, className)} />
    </div>
  )
}
