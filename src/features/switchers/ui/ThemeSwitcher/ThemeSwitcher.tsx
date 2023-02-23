import { FC, useMemo } from 'react'
import { useTheme } from '@/app/providers/theme'
import { Switch } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import s from './themeSwitcher.module.scss'

export const ThemeSwitcher: FC = () => {
  const { toggleTheme, theme } = useTheme()

  const isDark = useMemo(() => theme === 'dark', [theme])

  return (
    <div className={s.themeSwitcher}>
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
}
