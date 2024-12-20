import { HTMLAttributes, useState } from 'react'
import { Input, Popover } from '@/shared/ui'
import { classNames } from '@/shared/lib/classNames'
import { SelectList } from './SelectList'
import { useMergeState } from '@/shared/hooks'
import s from './select.module.scss'

export type Value = string | number

export interface SelectOption<T extends Value = string> {
  label: string
  value: T
  disabled?: boolean
}

interface SelectPropsBase<T extends Value = string> {
  value?: T
  defaultValue?: T
  options: SelectOption<T>[]
  label?: string
  readOnly?: boolean
  disabled?: boolean
  defaultOpen?: boolean
  onChange?: (val: T) => void
}

export type SelectProps<T extends Value = string> = SelectPropsBase<T> &
  Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>

export const Select = <T extends Value = string>(props: SelectProps<T>) => {
  const {
    className,
    value: outValue,
    defaultOpen,
    readOnly,
    disabled,
    onChange,
    options,
    label,
    id,
    defaultValue,
  } = props

  /* ---- Utils ---- */
  const getOption = (val?: T) => {
    return options.find((option) => option.value === val)
  }

  const getStartInputValue = () => {
    if (defaultOpen) {
      return ''
    }
    return getOption(outValue ?? defaultValue)?.label ?? ''
  }

  /* ---- State ---- */
  const [value, setValue] = useMergeState(outValue, { defaultValue, onChange })
  const current = getOption(value)
  const [inputValue, setInputValue] = useState(getStartInputValue())
  const [isListOpen, setIsListOpen] = useState(defaultOpen)

  /* ---- Handlers ---- */
  const inputFocusHandler = () => {
    if (readOnly || disabled) return
    setIsListOpen(true)
    setInputValue('')
  }

  const inputBlurHandler = () => {
    if (readOnly || disabled) return
    setIsListOpen(false)
    setInputValue(current?.label ?? '')
  }

  const selectHandler = (option: SelectOption<T>) => {
    if (readOnly || disabled) return
    setIsListOpen(false)

    setValue(option.value)
    setInputValue(option.label)
  }

  return (
    <div data-testid='select-container' className={classNames(s.select, className)}>
      {!!label && (
        <label htmlFor={id} className={s.label}>
          {label}
        </label>
      )}

      <Popover
        autoWidth
        trigger={[]}
        visible={isListOpen}
        offset={0}
        placement={['bottom', 'top', 'left', 'right']}
        content={
          <SelectList options={options} onSelect={selectHandler} selected={current?.value} />
        }
      >
        <Input
          data-testid='select-input'
          id={id}
          className={s.input}
          value={inputValue}
          readOnly
          disabled={disabled}
          onFocus={inputFocusHandler}
          onBlur={inputBlurHandler}
          /** TODO: Добавить i18n и в тестах это учесть */
          placeholder={current?.label || 'Выберите элемент'}
        />
      </Popover>
    </div>
  )
}
