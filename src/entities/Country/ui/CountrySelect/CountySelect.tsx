import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Country } from '../../model/types'
import { Select, SelectOption, SelectProps } from '@/shared/ui'

type CountySelectProps = Omit<SelectProps<Country>, 'options'>

export const CountySelect = (props: CountySelectProps) => {
  const { t } = useTranslation(['main'])

  const options = useMemo(
    () =>
      Object.values(Country).map(
        (value) =>
          ({
            label: t(`main:country.${value}`, value),
            value,
          } as SelectOption<Country>)
      ),
    [t]
  )

  return <Select options={options} {...props} />
}
