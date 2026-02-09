import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Github from './components/Github.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Github />
  </StrictMode>,
)
