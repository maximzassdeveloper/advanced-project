import { TextareaHTMLAttributes, forwardRef, memo } from 'react'
import { classNames } from '@/shared/lib/classNames'
import { Typography } from '@/shared/ui'
import s from './textarea.module.scss'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  isReadonly?: boolean
  error?: boolean | string
  label?: string
}

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    const { className, id, autoComplete = 'off', error, isReadonly, label, ...rest } = props

    const classes = classNames(s.textarea, className, {
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
        <textarea
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
