import React from 'react'
import shortid from 'shortid'
import MarkerLight from '../images/icon-white.svg'
import MarkerDark from '../images/icon-blue.svg'

const Spinner = ({ isNightMode }) => {
  return <div className='App-spinner' key='spinner'>
    <img src={isNightMode ? MarkerLight : MarkerDark} key={shortid.generate()}
      className='bounce' width={80} alt='Loading' title='loading' />
  </div>
}

export default Spinner
