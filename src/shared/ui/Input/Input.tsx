import { forwardRef, InputHTMLAttributes } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, autoComplete = 'off', ...rest } = props

  return (
    <input
      ref={ref}
      className={classNames(s.input, className)}
      autoComplete={autoComplete}
      {...rest}
    />
  )
})
