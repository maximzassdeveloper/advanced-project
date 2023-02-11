import { FC } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames'
import s from './appLink.module.scss'

interface AppLinkProps extends NavLinkProps {
  className?: string
}

export const AppLink: FC<AppLinkProps> = (props) => {
  const { className, to, children, ...rest } = props

  return (
    <NavLink
      to={to}
      className={({ isActive }) => classNames(s.appLink, className, { [s.active]: isActive })}
      {...rest}
    >
      {children}
    </NavLink>
  )
}
