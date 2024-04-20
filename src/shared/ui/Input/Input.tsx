import { forwardRef, InputHTMLAttributes, memo } from 'react'
import { Typography } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import s from './input.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  error?: boolean | string
  label?: string
}

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { className, id, autoComplete = 'off', error, label, readOnly, ...rest } = props

    const classes = classNames(s.input, className, {
      [s.errored]: !!error,
      [s.readonly]: readOnly,
    })

    return (
      <div className={classes} data-testid='input'>
        {!!label && (
          <label htmlFor={id} className={s.label}>
            {label}
          </label>
        )}

        <input ref={ref} id={id} autoComplete={autoComplete} readOnly={readOnly} {...rest} />

        {typeof error === 'string' && (
          <Typography.Text
            data-testid='error'
            className={s.error}
            theme='error'
            weight='500'
            size='xs'
          >
            {error}
          </Typography.Text>
        )}
      </div>
    )
  })
)
