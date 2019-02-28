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
      return (<div className='App-place empty loading'>
        <Spinner className='pulse' />
      </div>)
    } else if (locationRequested) {
      return (<div className='App-place empty location'>
        Requesting your location...
      </div>)
    } else if (!locationAuthorized && !locationError) {
      return (<div className='App-place empty location'>
        <div>
          This site needs access to your location <br />
          to find places nearby
        </div>
        <button
          className='small'
          onClick={() => getLocation()}>
          Find me
        </button>
      </div>)
    } else if (locationError) {
      return (<div className='App-place empty location'>
        {locationErrorMessage}
      </div>)
    } else if (placesError) {
      return (<div className='App-place empty no-places-found'>
        No places were found
      </div>)
    } else {
      return (<div className='App-place empty'>
        <Spinner />
      </div>)
    }
  }
}

export default EmptyPlaces
