import { ButtonHTMLAttributes, forwardRef, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { Spinner } from '@/shared/ui'
import { useAddWave } from '@/shared/hooks'
import { composeRef } from '@/shared/lib/composeRef'
import { classNames } from '@/shared/lib/classNames'
import { mergeProps } from '@/shared/lib/mergeProps'
import s from './button.module.scss'

type ButtonTheme = 'primary' | 'secondary' | 'outline' | 'clear'
type ButtonSize = 'm' | 'l'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  loading?: boolean
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, type = 'button', className, theme = 'primary', loading, ...rest } = props

  const buttonRef = useRef<HTMLButtonElement>(null)
  const waveProps = useAddWave<HTMLButtonElement>(buttonRef, props)

  const [disabled, setDisabled] = useState(props.disabled)
  const disabledRef = useRef(props.loading)

  useEffect(() => {
    setDisabled(props.disabled)
  }, [props.disabled])

  // Disable button on loading
  useEffect(() => {
    if (loading) {
      disabledRef.current = disabled
      setDisabled(true)
    } else {
      setDisabled(!!disabledRef.current)
    }
    // eslint-disable-next-line
  }, [loading])

  return (
    <button
      ref={composeRef(buttonRef, ref)}
      type={type}
      className={classNames(s.button, className, s[theme], { [s.loading]: loading })}
      disabled={disabled}
      {...mergeProps(rest, waveProps)}
    >
      {children}
      <CSSTransition
        timeout={200}
        in={loading}
        classNames='fade'
        mountOnEnter
        unmountOnExit
      >
        <div className={s.loader}>
          <Spinner
            size='small'
            color='white'
          />
        </div>
      </CSSTransition>
    </button>
  )
})
