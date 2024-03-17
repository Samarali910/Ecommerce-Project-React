import React from 'react'
import Navbaar from '../navbaar/Navbaar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'

const Layout = () => {
  return (
    <>
        <Navbaar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout;