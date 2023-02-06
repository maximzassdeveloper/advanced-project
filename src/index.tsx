import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/app/App'
import { ThemeProvider } from '@/app/providers/theme'

const root = document.getElementById('root')
render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>,
  root,
)