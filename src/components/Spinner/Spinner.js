import React from 'react'
import MarkerLight from '../../assets/marker-light.svg'
import MarkerDark from '../../assets/marker-dark.svg'

const Spinner = ({ nightMode, className }) => {
  return <div className='App-spinner' key='spinner'>
    <img src={nightMode ? MarkerLight : MarkerDark}
      className={className}
      width={60}
      alt='Loading'
      title='loading' />
  </div>
}

export default Spinner
