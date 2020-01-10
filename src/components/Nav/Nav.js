import React from 'react'
import './Nav.css'

const Nav = ({ children }) => {
  return (<div className='nav'>
    {children}
  </div>)
}

export default Nav
