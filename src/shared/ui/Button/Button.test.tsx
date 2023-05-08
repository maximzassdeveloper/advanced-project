import { render, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  test('render correctly', () => {
    const { container } = render(<Button>Button</Button>)
    expect(container.firstChild!).toBeInTheDocument()
  })

  test('render correctly primary theme', () => {
    const { container } = render(<Button theme='primary'>Button</Button>)
    expect(container.firstChild!).toHaveClass('primary')
  })

  test('should not clickable when button is loading', () => {
    const onClick = jest.fn()
    const { container } = render(
      <Button
        loading
        onClick={onClick}
      >
        Button
      </Button>
    )
    fireEvent.click(container.firstChild!)
    expect(onClick).toHaveBeenCalledTimes(0)
  })
})

