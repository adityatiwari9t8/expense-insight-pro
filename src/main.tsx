import React from 'react'
import ReactDOM from 'react-dom/client'
// Self-hosted fonts
import '@fontsource-variable/inter/wght.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
