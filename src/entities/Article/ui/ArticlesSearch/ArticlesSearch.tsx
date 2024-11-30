import { ChangeEvent, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon, Input } from '@/shared/ui'
import s from './articles-search.module.scss'
import { classNames } from '@/shared/lib/classNames'

interface ArticlesSearchProps {
  value: string
  onChange?: (value: string) => void
  className?: string
}

export const ArticlesSearch: FC<ArticlesSearchProps> = (props) => {
  const { value, onChange, className } = props
  const { t } = useTranslation(['articles'])

  const [isActive, setIsActive] = useState(false)

  const debouncedOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={classNames(s.search, className, { [s.active]: isActive })}>
      <Input
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        name='blog-search'
        className={s.input}
        value={value}
        onChange={debouncedOnChange}
        placeholder={t('articles:search.placeholder', 'Поиск')}
      />
      <Icon
        onClick={() => setIsActive(true)}
        className={s.searchIcon}
        size='l'
        weight={700}
        hovered
        icon='ph-bold ph-magnifying-glass'
      />
    </div>
  )
}
