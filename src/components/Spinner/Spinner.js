import React from 'react'
import MarkerLight from '../../assets/marker-light.svg'
import MarkerDark from '../../assets/marker-dark.svg'
import './Spinner.css'

const Spinner = ({ nightMode, className, children }) => {
  return <div className='spinner' key='spinner'>
    <img src={nightMode ? MarkerLight : MarkerDark}
      className={className}
      width={60}
      alt='' />
    {children}
  </div>
}

export default Spinner
