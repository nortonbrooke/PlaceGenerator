import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import Spinner from '../../components/Spinner'
import './EmptyPlaces.css'

class EmptyPlaces extends Component {
  render () {
    const {
      location,
      requested,
      error
    } = this.props
    if (isEmpty(location)) {
      return (<div className='App-place empty'>
        Please allow your location
      </div>)
    } else if (error) {
      return (<div className='App-place empty'>
        No places found
      </div>)
    } else if (requested) {
      return (<div className='App-place empty'>
        <Spinner className='pulse' />
      </div>)
    } else {
      return (<div className='App-place empty'>
        <Spinner />
      </div>)
    }
  }
}

export default EmptyPlaces
