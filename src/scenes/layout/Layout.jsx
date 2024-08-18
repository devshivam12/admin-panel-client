import { Box, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import { useGetUserQuery } from '../../state/api'

const Layout = () => {

  const isNonMobile = useMediaQuery("(min-width: 600px)")
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId)
  
  const userData = data?.data
  console.log("data", userData)
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={userData || {}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={userData || {}}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
