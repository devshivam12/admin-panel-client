import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { themeSettings } from './theme'
import { createTheme } from '@mui/material/styles'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './scenes/dashboards/Dashboard'
import Layout from './scenes/layout/Layout'
import Products from './scenes/products/Products'
import Customers from './scenes/customers/Customers'
import Transactions from './scenes/transactions/Transactions'
import Geography from './scenes/locations/Geography'
import OverView from './scenes/overview/OverView'
import Daily from './scenes/daily/Daily'
import Monthly from './scenes/monthly/Monthly'

const App = () => {

  const mode = useSelector((state) => state.global.mode)

  const theme = useMemo(() =>
    createTheme(themeSettings(mode))
    , [mode]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/products' element={<Products />} />
            <Route path='/customers' element={<Customers />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/geography' element={<Geography />} />
            <Route path='/overview' element={<OverView />} />
            <Route path='/daily' element={<Daily />} />
            <Route path='/monthly' element={<Monthly />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
