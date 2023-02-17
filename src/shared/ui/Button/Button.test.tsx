import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  test('Test render', () => {
    render(<Button>Button</Button>)
    expect(screen.getByText('Button')).toBeInTheDocument()
  })

  test('Test primary theme', () => {
    render(<Button theme='primary'>Button</Button>)
    expect(screen.getByText('Button')).toHaveClass('primary')
  })
})
