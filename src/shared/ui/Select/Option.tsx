import { FC } from 'react'
import { classNames } from '@/shared/lib/classNames'
import { SelectOption } from './Select'
import s from './select.module.scss'

interface OptionProps {
  option: SelectOption
  selected: boolean
  onSelect: (option: SelectOption) => void
}

export const Option: FC<OptionProps> = (props) => {
  const { option, selected, onSelect } = props

  const clickHandler = () => {
    if (option.disabled) return

    onSelect(option)
  }

  return (
    <span
      onClick={clickHandler}
      className={classNames(s.option, { [s.selected]: selected, [s.disabled]: option.disabled })}
    >
      {option.label}
    </span>
  )
}
