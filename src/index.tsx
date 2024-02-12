import { createRoot } from 'react-dom/client'
import { AllProviders } from '@/app/providers'
import { App } from '@/app/App'

const root = createRoot(document.getElementById('root') as Element)
root.render(
  <AllProviders>
    <App />
  </AllProviders>
)

