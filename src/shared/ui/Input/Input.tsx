import { forwardRef, InputHTMLAttributes } from 'react'
import { Typography } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import s from './input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: boolean | string
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, autoComplete = 'off', error, ...rest } = props

  return (
    <div className={classNames(s.input, className, { [s.errored]: !!error })}>
      <input
        ref={ref}
        autoComplete={autoComplete}
        {...rest}
      />
      {typeof error === 'string' && (
        <Typography.Text
          className={s.error}
          theme='error'
        >
          {error}
        </Typography.Text>
      )}
    </div>
  )
})
