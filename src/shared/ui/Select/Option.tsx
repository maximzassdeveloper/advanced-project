import { FC } from 'react'
import { classNames } from '@/shared/lib/classNames'
import { SelectOption } from './Select'
import s from './select.module.scss'

interface OptionProps {
  option: SelectOption
  selected: boolean
  onSelect: (val: string) => void
}

export const Option: FC<OptionProps> = (props) => {
  const { option, selected, onSelect } = props

  return (
    <span
      onClick={() => onSelect(option.value)}
      className={classNames(s.option, { [s.selected]: selected, [s.disabled]: option.disabled })}
    >
      {option.label}
    </span>
  )
}
