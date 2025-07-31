import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/pages/_layout'
import DashboardPage from './components/pages/dashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
