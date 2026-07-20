import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import logo from './assets/logo.png'
import { createSquareIcon, setLinkIcon } from './setFavicon.js'

createSquareIcon(logo).then((squareIcon) => {
  setLinkIcon('icon', squareIcon)
  setLinkIcon('apple-touch-icon', squareIcon)
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
