import { screen } from '@testing-library/react'
import { renderComponent } from '@/shared/lib/test/renderComponent'
import { Header } from './Header'

describe('Header', () => {
  test('Test render', () => {
    renderComponent(<Header />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })
})
