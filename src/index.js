import React from 'react'
import ReactDOM from 'react-dom/client'
import 'styles/style.scss'
import App from './App'
import { AppProvider } from './hooks/context'
import * as setup from './setup'
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css'
import './i18n'
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from 'axios'

const root = ReactDOM.createRoot(document.getElementById('root'))

setup.setupAxios(axios)
const clientQuery = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
})

root.render(
  <React.StrictMode>
    <React.Suspense>
      <QueryClientProvider client={clientQuery}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
    </React.Suspense>
  </React.StrictMode>
)
