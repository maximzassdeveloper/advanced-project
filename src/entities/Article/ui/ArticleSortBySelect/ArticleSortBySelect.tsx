import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ArticleSortBy } from '../../model/const'
import { Select } from '@/shared/ui'
import { enumEntries } from '@/shared/lib/enum'

interface SortBySelectProps {
  value: ArticleSortBy
  onChange: (value: ArticleSortBy) => void
}

export const ArticleSortBySelect: FC<SortBySelectProps> = (props) => {
  const { value, onChange } = props
  const { t } = useTranslation(['articles'])

  const sortByTranslations: Record<ArticleSortBy, string> = useMemo(
    () => ({
      created_at: t('articles:sortBy.created_at', 'По новизне'),
      popular: t('articles:sortBy.popular', 'По популярности'),
    }),
    [t]
  )

  const sortByOptions = useMemo(() => {
    return enumEntries(ArticleSortBy).map((i) => ({ label: sortByTranslations[i[1]], value: i[1] }))
  }, [sortByTranslations])

  return <Select value={value} onChange={onChange} options={sortByOptions} />
}
