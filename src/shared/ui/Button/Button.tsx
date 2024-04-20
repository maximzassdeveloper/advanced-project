import { ButtonHTMLAttributes, forwardRef, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Spinner } from '@/shared/ui'
import { useAddWave } from '@/shared/hooks'
import { composeRef } from '@/shared/lib/composeRef'
import { classNames } from '@/shared/lib/classNames'
import { mergeProps } from '@/shared/lib/mergeProps'
import s from './button.module.scss'

type ButtonTheme = 'primary' | 'outline' | 'clear'
type ButtonSize = 'xs' | 's' | 'm'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonTheme
  size?: ButtonSize
  loading?: boolean
  className?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    children,
    type = 'button',
    className,
    size = 's',
    theme = 'primary',
    loading,
    disabled,
    ...rest
  } = props

  const buttonRef = useRef<HTMLButtonElement>(null)
  const waveProps = useAddWave<HTMLButtonElement>(buttonRef, props)

  return (
    <button
      ref={composeRef(buttonRef, ref)}
      type={type}
      className={classNames(s.button, className, s[size], s[theme], { [s.loading]: loading })}
      disabled={loading || disabled}
      {...mergeProps(rest, waveProps)}
    >
      {children}
      <CSSTransition timeout={200} in={loading} classNames='fade' mountOnEnter unmountOnExit>
        <span className={s.loader}>
          <Spinner size='small' color='white' />
        </span>
      </CSSTransition>
    </button>
  )
})
