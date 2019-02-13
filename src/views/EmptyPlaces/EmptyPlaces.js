import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import Spinner from '../../components/Spinner'
import './EmptyPlaces.css'

class EmptyPlaces extends Component {
  render () {
    const {
      location,
      locationRequested,
      getLocation,
      placesRequested,
      error
    } = this.props
    if (locationRequested || placesRequested) {
      return (<div className='App-place empty loading'>
        <Spinner className='pulse' />
      </div>)
    } else if (isEmpty(location)) {
      return (<div className='App-place empty location'>
        <div>
          This site needs access to your location <br />
          to find places near you
        </div>
        <button
          className='small'
          onClick={() => getLocation()}>
          Enable location services
        </button>
      </div>)
    } else if (error) {
      return (<div className='App-place empty'>
        No places found
      </div>)
    } else {
      return (<div className='App-place empty'>
        <Spinner />
      </div>)
    }
  }
}

export default EmptyPlaces
