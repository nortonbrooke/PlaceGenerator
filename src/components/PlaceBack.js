import React from 'react'

const PlaceBack = ({ onClick, children }) => {
  return (<div className='App-place back' title='Reveal place' onClick={onClick}>
    <div className='body'>
      {children}
    </div>
  </div>)
}

export default PlaceBack
