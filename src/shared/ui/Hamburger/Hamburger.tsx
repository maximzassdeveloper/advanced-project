import { FC, MouseEventHandler } from 'react'
import { classNames } from '@/shared/lib/classNames'
import s from './hamburger.module.scss'

interface HamburgerProps {
  active: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
}

export const Hamburger: FC<HamburgerProps> = (props) => {
  const { active, className, onClick } = props

  return (
    <button
      className={classNames(s.hamburger, s.squeeze, className, {
        [s.isActive]: active,
      })}
      onClick={onClick}
      type='button'
    >
      <span className={s.box}>
        <span className={s.inner} />
      </span>
    </button>
  )
}
