import { render } from 'react-dom'
import { AllProviders } from '@/app/providers'
import { App } from '@/app/App'

const root = document.getElementById('root')
render(
  <AllProviders>
    <App />
  </AllProviders>,
  root,
)
