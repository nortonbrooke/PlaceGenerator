import React from 'react'
import classnames from 'classnames'
import './Radius.css'

const RadiusIcon = ({ className }) => {
  return (
    <div className={classnames('App-radius', className)}>
      <div className='center' />
      <div className='radius' />
    </div>
  )
}

export default RadiusIcon
