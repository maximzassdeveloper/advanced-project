import { ChangeEvent, FC, useMemo, useState } from 'react'
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
  const { className, options: defaultOptions, search } = props

  const [options, setOptions] = useState<SelectOption[]>(defaultOptions)
  const [value, setValue] = useState<SelectOption | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [listVisible, setListVisible] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!search) return
    setInputValue(e.target.value)
    setOptions((options) =>
      options.filter(({ label }) => label.toLowerCase().includes(e.target.value.toLowerCase()))
    )
  }

  const inputFocusHandler = () => {
    setIsSearching(true)
    setInputValue('')
  }

  const inputBlurHandler = () => {
    setInputValue(value?.label ?? '')
    setTimeout(() => {
      setIsSearching(false)
      setOptions(defaultOptions)
    }, 300)
  }

  const selectHandler = (option: SelectOption) => {
    setListVisible(false)
    setValue(option)
    setInputValue(option.label)
    // setIsSearching(false)
    // setOptions(defaultOptions)
  }

  // const searchedOptions = useMemo(() => {
  //   if (isSearching && search) {
  //     return options.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
  //   }
  //   return options
  // }, [search, isSearching, options, inputValue])

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
            selected={value?.value ?? ''}
          />
        }
      >
        <Input
          className={s.input}
          value={inputValue}
          readOnly={!search}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          onClick={() => setListVisible((prev) => !prev)}
          placeholder={value?.label || 'Выберите элемент'}
        />
      </Popover>
    </div>
  )
}
