import React from 'react'
import ReactDOM from 'react-dom/client'
import 'styles/style.scss'
import App from './App'
import { AppProvider } from './hooks/context'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)
