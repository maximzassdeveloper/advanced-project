import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Currency } from '../../model/types'
import { Select, SelectOption, SelectProps } from '@/shared/ui'

type CurrencySelectProps = Omit<SelectProps<Currency>, 'options'>

export const CurrencySelect = (props: CurrencySelectProps) => {
  const { t } = useTranslation(['main'])

  const options = useMemo(
    () =>
      Object.values(Currency).map(
        (value) =>
          ({
            label: t(`main:currency.${value}`, value),
            value,
          } as SelectOption<Currency>)
      ),
    [t]
  )

  return <Select options={options} {...props} />
}
