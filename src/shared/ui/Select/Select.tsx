import { FC, useState } from 'react'
import { Input, Popover } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import { SelectList } from './SelectList'
import s from './select.module.scss'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

interface SelectProps {
  className?: string
  options: SelectOption[]
  search?: boolean
}

export const Select: FC<SelectProps> = (props) => {
  const { className, options, search } = props

  const [value, setValue] = useState('')
  const [listVisible, setListVisible] = useState(false)

  const selectHandler = (val: string) => {
    setListVisible(false)
    setValue(val)
  }

  return (
    <div className={classNames(s.select, className)}>
      <Popover
        autoWidth
        visible={listVisible}
        onVisibleChange={(v) => setListVisible(v)}
        content={
          <SelectList
            options={options}
            onSelect={selectHandler}
            selected={value}
          />
        }
      >
        <Input
          className={s.input}
          value={value}
          onClick={() => setListVisible((prev) => !prev)}
          placeholder='Выберите элемент'
        />
      </Popover>
    </div>
  )
}
