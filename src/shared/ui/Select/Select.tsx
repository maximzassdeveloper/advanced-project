import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'
import { Input, Popover } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import { SelectList } from './SelectList'
import s from './select.module.scss'

export interface SelectOption<T = string> {
  label: string
  value: T
  disabled?: boolean
}

export interface SelectProps<T = string> {
  className?: string
  value?: T
  onChange?: (val: T) => void
  options: SelectOption<T>[]
  isReadonly?: boolean
  search?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
  const { className, value, isReadonly, onChange, options: defaultOptions, search } = props

  const [options, setOptions] = useState<SelectOption[]>(defaultOptions)
  // const [value, setValue] = useState<SelectOption | null>(null)
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
    if (isReadonly) return
    setIsSearching(true)
    setInputValue('')
    setListVisible(true)
  }

  useEffect(() => {
    const current = options.find((option) => option.value === value)
    setInputValue(current?.label ?? '')
  }, [value])

  const inputBlurHandler = () => {
    const current = options.find((option) => option.value === value)
    setInputValue(current?.label ?? '')
    setTimeout(() => {
      setIsSearching(false)
      setOptions(defaultOptions)
    }, 300)
  }

  const selectHandler = (option: SelectOption) => {
    setListVisible(false)
    onChange?.(option.value as T)
    setInputValue(option.label)
    // setIsSearching(false)
    // setOptions(defaultOptions)
  }

  const toggleSelectList = () => {
    if (isReadonly) return
    setListVisible((prev) => !prev)
  }

  // const searchedOptions = useMemo(() => {
  //   if (isSearching && search) {
  //     return options.filter(({ label }) => label.toLowerCase().includes(inputValue.toLowerCase()))
  //   }
  //   return options
  // }, [search, isSearching, options, inputValue])

  const current = options.find((option) => option.value === value)

  return (
    <div className={classNames(s.select, className)}>
      <Popover
        autoWidth
        visible={listVisible}
        onVisibleChange={(v) => setListVisible(v)}
        offset={0}
        content={
          <SelectList options={options} onSelect={selectHandler} selected={current?.value ?? ''} />
        }
      >
        <Input
          className={s.input}
          value={inputValue}
          isReadonly={isReadonly ?? !search}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
          onChange={inputChangeHandler}
          onClick={toggleSelectList}
          placeholder={current?.label || isReadonly ? '' : 'Выберите элемент'}
        />
      </Popover>
    </div>
  )
}
