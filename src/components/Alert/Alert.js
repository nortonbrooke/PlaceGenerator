import React from 'react'
import './Alert.css'

const Alert = ({ children, className }) => {
  return (<div className='App-alert'>
    {children}
  </div>)
}

export default Alert
