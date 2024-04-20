import { render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  test('should return correct snapshot', () => {
    const { container } = render(<Input label='wow label' defaultValue='wow' />)
    expect(container.firstChild).toMatchSnapshot()
  })

  test('should show error message', () => {
    render(<Input error='Error by test' />)

    expect(screen.getByText(/Error by test/i)).toBeInTheDocument()
    expect(screen.getByTestId('input')).toMatchSnapshot()
  })

  test('should not show error element if error prop boolean', () => {
    render(<Input error />)

    expect(screen.queryByTestId('error')).toBeNull()
    expect(screen.getByTestId('input')).toHaveClass('errored')
  })

  test('should render label', () => {
    render(<Input label='input label' id='name' />)

    const label = screen.getByText(/input label/i)
    const input = screen.getByLabelText(/input label/i)

    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', 'name')
    expect(input).toHaveAttribute('id', 'name')

    expect(screen.getByTestId('input')).toMatchSnapshot()
  })
})
