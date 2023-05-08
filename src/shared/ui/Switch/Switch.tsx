import { forwardRef, HTMLAttributes, ReactNode, useRef } from 'react'
import { useAddWave } from '@/shared/hooks'
import { composeRef } from '@/shared/lib/composeRef'
import { classNames } from '@/shared/lib/classNames'
import s from './switch.module.scss'

export interface SwitchProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  checked: boolean
  disabled?: boolean
  className?: string
  icon?: ReactNode
  size?: 'm' | 'l'
  onChange?: (checked: boolean) => void
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const { checked, disabled, className, size = 'm', icon, onChange, ...rest } = props

  const switchRef = useRef<HTMLButtonElement>(null)

  const waveProps = useAddWave(switchRef, props)

  const changeHandler = () => {
    onChange?.(!checked)
  }

  return (
    <button
      ref={composeRef(switchRef, ref)}
      type='button'
      role='switch'
      disabled={disabled}
      aria-checked={checked}
      className={classNames(s.switch, s[size], className, {
        [s.checked]: checked,
      })}
      onClick={changeHandler}
      {...waveProps}
      {...rest}
    >
      <span className={s.handle}>{icon}</span>
    </button>
  )
})

