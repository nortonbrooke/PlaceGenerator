import React from 'react'
import classnames from 'classnames'
import './Alert.css'

const Alert = ({ children, banner }) => {
  return (<div className={classnames('App-alert', {banner: banner})}>
    {children}
  </div>)
}

export default Alert
