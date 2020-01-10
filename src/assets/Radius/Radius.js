import React from 'react'
import classnames from 'classnames'
import './Radius.css'

const RadiusIcon = ({ className }) => {
  return (
    <div className={classnames('radius', className)}>
      <div className='center' />
      <div className='line' />
    </div>
  )
}

export default RadiusIcon
