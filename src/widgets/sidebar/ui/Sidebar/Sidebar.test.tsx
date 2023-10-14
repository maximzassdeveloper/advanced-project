import { screen } from '@testing-library/react'
import { renderComponent } from '@/shared/lib/test/renderComponent'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  test('Test render', () => {
    renderComponent(<Sidebar />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })
})
