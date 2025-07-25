import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./icons.js"
import './i18n.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
