import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Country } from '../../model/const'
import { Select, SelectOption, SelectProps } from '@/shared/ui'

type CountySelectProps = Omit<SelectProps<Country>, 'options'>

export const CountySelect = (props: CountySelectProps) => {
  const { t } = useTranslation(['main'])

  const options = useMemo(
    () =>
      Object.values(Country).map(
        (value) =>
          ({
            // TODO: fix extract i18next warning
            label: t(`main:country.${value}`, value),
            value,
          } as SelectOption<Country>)
      ),
    [t]
  )

  return <Select options={options} {...props} />
}
