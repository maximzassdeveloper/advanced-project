import { forwardRef, InputHTMLAttributes, memo } from 'react'
import { Typography } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import s from './input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  isReadonly?: boolean
  error?: boolean | string
  label?: string
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { className, id, autoComplete = 'off', error, isReadonly, label, ...rest } = props

    const classes = classNames(s.input, className, {
      [s.errored]: !!error,
      [s.readonly]: isReadonly,
    })

    return (
      <div className={classes}>
        {!!label && (
          <label
            htmlFor={id}
            className={s.label}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          autoComplete={autoComplete}
          readOnly={isReadonly}
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
)
