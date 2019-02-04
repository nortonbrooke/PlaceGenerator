import React from 'react'

const PlaceDisabled = ({ children }) => {
  return (<div className='App-place disabled' title='No places were found'>
    <div className='App-place body'>
      {children}
    </div>
  </div>)
}

export default PlaceDisabled
