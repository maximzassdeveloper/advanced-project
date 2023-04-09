import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18nForTests from '@/shared/config/i18n/i18nForTests'
import { StoreProvider } from '@/app/providers/store'

interface RenderOptions {
  route?: string
}

export function renderComponent(component: ReactNode, options: RenderOptions = {}) {
  const { route = '/' } = options

  return render(
    <StoreProvider>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>
      </MemoryRouter>
    </StoreProvider>
  )
}
