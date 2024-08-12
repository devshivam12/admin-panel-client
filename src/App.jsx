import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { themeSettings } from './theme'
import { createTheme } from '@mui/material/styles'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './scenes/dashboards/Dashboard'
import Layout from './scenes/layout/Layout'

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
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
