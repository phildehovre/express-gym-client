import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom'
import './index.css'
import './normalize.css'
import App from './App.jsx'
import CheckoutProvider from './context/Checkoutcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CheckoutProvider>
      <Router>
        <App />
      </Router>
    </CheckoutProvider>
  </StrictMode>,
)
