import React, { Component } from 'react'
import Spinner from '../../components/Spinner'
import './EmptyPlaces.css'

class EmptyPlaces extends Component {
  render () {
    const {
      locationRequested,
      locationAuthorized,
      locationError,
      locationErrorMessage,
      getLocation,
      placesRequested,
      placesError
    } = this.props
    if (placesRequested) {
      return (<div className='empty-places loading'>
        <Spinner className='pulse' />
      </div>)
    } else if (locationRequested) {
      return (<div className='empty-places location'>
        Requesting your location...
      </div>)
    } else if (!locationAuthorized && !locationError) {
      return (<div className='empty-places location'>
        <div>
          This site needs access to your location <br />
          to find places nearby
        </div>
        <button
          className='small'
          onClick={() => getLocation()}>
          Share location
        </button>
      </div>)
    } else if (locationError) {
      return (<div className='empty-places location'>
        {locationErrorMessage}
        <button
          className='small'
          onClick={() => getLocation()}>
          Try again
        </button>
      </div>)
    } else if (placesError) {
      return (<div className='empty-places no-places-found'>
        No places found
      </div>)
    } else {
      return (<div className='empty-places'>
        <Spinner />
      </div>)
    }
  }
}

export default EmptyPlaces
