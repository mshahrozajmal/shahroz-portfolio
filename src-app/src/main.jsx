import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initTheme } from './theme'
import './index.css'

// Daylight mode is the default; a stored Midnight choice is applied first so
// the palette never flashes on load.
initTheme()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
