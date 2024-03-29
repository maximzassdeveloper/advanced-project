import { FC, memo, useMemo } from 'react'
import { useTheme } from '@/app/providers/theme'
import { Switch } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import s from './themeSwitcher.module.scss'

interface ThemeSwitcherProps {
  className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo((props) => {
  const { className } = props
  const { toggleTheme, theme } = useTheme()

  const isDark = useMemo(() => theme === 'dark', [theme])

  return (
    <div className={className}>
      <Switch
        className={classNames(s.switcher, { [s.checked]: isDark })}
        checked={isDark}
        onChange={() => toggleTheme()}
        size='l'
        icon={
          <i
            className={classNames(s.icon, {
              'ph-moon': isDark,
              'ph-sun': !isDark,
            })}
          />
        }
      />
    </div>
  )
})
