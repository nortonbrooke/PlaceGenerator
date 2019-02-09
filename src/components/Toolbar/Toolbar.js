import React from 'react'
import './Toolbar.css'

const Toolbar = ({ children }) => {
  return (<div className='App-toolbar'>
    {children}
  </div>)
}

export default Toolbar
