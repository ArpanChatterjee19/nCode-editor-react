import React from 'react'
import logoImage from '../assets/LOGO.png'
import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to='/'><img src={logoImage} alt="ByteScribe" className='h-12 ml-3'/></NavLink>
  )
}

export default Logo