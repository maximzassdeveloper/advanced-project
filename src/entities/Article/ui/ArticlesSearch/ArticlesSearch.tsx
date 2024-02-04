import { ChangeEvent, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from '@/shared/ui'
import { useDebounceCallback } from '@/shared/hooks'

interface ArticlesSearchProps {
  value: string
  onChange?: (value: string) => void
}

export const ArticlesSearch: FC<ArticlesSearchProps> = (props) => {
  const { value, onChange } = props
  const { t } = useTranslation(['articles'])

  const debouncedOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div>
      <Input
        name='blog-search'
        value={value}
        onChange={debouncedOnChange}
        placeholder={t('articles:search.placeholder', 'Поиск...')}
      />
    </div>
  )
}
