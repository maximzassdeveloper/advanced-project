import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Button, ButtonProps } from './Button'

const WrapperToTestLoading = (props: ButtonProps) => {
  const { loading, disabled, ...rest } = props
  const [_disabled, setDisabled] = useState(disabled)
  const [_loading, setLoading] = useState(loading)

  return (
    <>
      <span onClick={() => setLoading((p) => !p)}>Trigger loading</span>
      <span onClick={() => setDisabled((p) => !p)}>Trigger disabled</span>
      <Button disabled={_disabled} loading={_loading} {...rest}>
        Button
      </Button>
    </>
  )
}

describe('Button', () => {
  test('should return correct snapshot', () => {
    const { container } = render(<Button>Button</Button>)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('render correctly primary theme', () => {
    const { container } = render(<Button theme='primary'>Button</Button>)
    expect(container.firstChild).toHaveClass('primary')
  })

  test('render correctly disabled', () => {
    const { container } = render(<Button disabled>Button</Button>)
    expect(container.firstChild).toBeDisabled()
  })

  test('should not clickable when button is loading', () => {
    const onClick = jest.fn()
    render(
      <Button loading onClick={onClick}>
        Button
      </Button>
    )
    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(0)
  })

  test('should make actual disable state after loading', () => {
    const onClick = jest.fn()

    render(<WrapperToTestLoading disabled />)

    const button = screen.getByRole('button')
    const triggerLoading = screen.getByText(/Trigger loading/i)

    fireEvent.click(triggerLoading)
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(0)

    fireEvent.click(triggerLoading)
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(0)
    expect(button).toBeDisabled()
  })

  test('should make actual state if disabled is changed during loading', () => {
    const onClick = jest.fn()

    render(<WrapperToTestLoading disabled />)

    const button = screen.getByRole('button')
    const triggerLoading = screen.getByText(/Trigger loading/i)
    const triggerDisable = screen.getByText(/Trigger disable/i)

    // disabled and loading
    fireEvent.click(triggerLoading)
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(0)

    // not disabled and loading
    fireEvent.click(triggerDisable)
    expect(button).toBeDisabled()

    // not disabled and not loading
    fireEvent.click(triggerLoading)
    fireEvent.click(button)
    expect(button).not.toBeDisabled()
  })
})

