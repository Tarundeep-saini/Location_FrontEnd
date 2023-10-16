import React from 'react'
import { NavLink } from "react-router-dom";

import NavLinks from './NavLinks'
const Header = () => {
  return (
    
    <div className='flex h-20 items-center justify-between drop-shadow-lg bg-lime-400'>
      <NavLink className="flex  ml-8 text-3xl font-semibold text-white tracking-widest"  to="/">
        All Users
      </NavLink>
    {/* <h1 className="flex  ml-8 text-3xl font-semibold text-white tracking-widest" >  Places  </h1> */}


    <NavLinks />

    
    </div>
  )
}

export default Header