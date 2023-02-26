import { FC } from 'react'
import { Option } from './Option'
import { SelectOption } from './Select'
import s from './select.module.scss'

interface SelectListProps {
  options: SelectOption[]
  selected: string
  onSelect: (val: string) => void
}

export const SelectList: FC<SelectListProps> = (props) => {
  const { options, selected, onSelect } = props

  return (
    <div className={s.list}>
      {options.map((option) => (
        <Option
          key={option.value}
          option={option}
          onSelect={onSelect}
          selected={selected === option.value}
        />
      ))}
    </div>
  )
}
