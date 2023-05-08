import { useState } from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Switch, SwitchProps } from './Switch'

function SwitchWrapper(props: Partial<SwitchProps>) {
  const [checked, setChecked] = useState(props.checked ?? false)

  const changeHandler = (value: boolean) => {
    setChecked(value)
    props.onChange?.(value)
  }

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={changeHandler}
    />
  )
}

describe('Switch', () => {
  test('should change state when clicked', () => {
    const { container } = render(<SwitchWrapper checked={false} />)
    const switchComponent = container.firstChild!

    fireEvent.click(switchComponent)
    expect(switchComponent).toHaveAttribute('aria-checked', 'true')

    fireEvent.click(switchComponent)
    expect(switchComponent).toHaveAttribute('aria-checked', 'false')
  })

  test('should not change state if disabled', () => {
    const mockedOnChange = jest.fn()

    const { container } = render(
      <SwitchWrapper
        checked={true}
        onChange={mockedOnChange}
        disabled
      />
    )
    const switchComponent = container.firstChild!

    fireEvent.click(switchComponent)
    expect(switchComponent).toHaveAttribute('aria-checked', 'true')
    expect(mockedOnChange).toHaveBeenCalledTimes(0)
  })
})
