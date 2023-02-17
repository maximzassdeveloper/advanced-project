import { ButtonHTMLAttributes, forwardRef, useRef } from 'react'
import { useAddWave } from '@/shared/hooks'
import { composeRef } from '@/shared/lib/composeRef'
import { classNames } from '@/shared/lib/classNames'
import s from './button.module.scss'

type ButtonTheme = 'primary' | 'secondary' | 'outline'
type ButtonSize = 'm' | 'l'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
  size?: ButtonSize
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, type = 'button', className, theme = 'primary', ...rest } = props

  const buttonRef = useRef<HTMLButtonElement>(null)

  const waveProps = useAddWave<HTMLButtonElement>(buttonRef, props)

  return (
    <button
      ref={composeRef(buttonRef, ref)}
      type={type}
      className={classNames(s.button, className, s[theme])}
      {...waveProps}
      {...rest}
    >
      {children}
    </button>
  )
})
