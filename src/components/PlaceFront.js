import React, { Component } from 'react'
import get from 'lodash/get'
import ArrowDark from '../images/icon-arrow-blue.svg'
import ArrowLight from '../images/icon-arrow-white.svg'
import PlaceDetail from './PlaceDetail/PlaceDetail'

class PlaceFront extends Component {
  constructor (props) {
    super(props)
    this.state = {
      placeDistance: null,
      placeDetail: null,
      placeDetailAttributions: []
    }
  }

  componentDidMount () {
    this.getPlaceDistance()
    this.getPlaceDetail()
  }

  getPlaceDetail () {
    const { place } = this.props
    const request = {
      placeid: place.place_id
    }
    this.props.googleMapsClient.place(request, (error, response) => {
      if (error) {
        console.log(error)
        this.setState({ error: true })
      }
      if (response) {
        this.setState({
          placeDetail: response.json.result,
          placeDetailAttributions: response.json.html_attributions
        })
      }
    })
  }

  getPlaceDistance () {
    const { location, place } = this.props
    const request = {
      origins: [location],
      destinations: 'place_id:' + place.place_id,
      units: 'imperial'
    }
    this.props.googleMapsClient.distanceMatrix(request, (error, response) => {
      if (error) {
        console.log(error)
        this.setState({ error: true })
      }
      if (response) {
        const rows = response.json.rows
        const elements = get(rows[0], 'elements')
        const distance = get(elements[0], 'distance.text')
        this.setState({ placeDistance: distance })
      }
    })
  }

  render () {
    const {
      isNightMode,
      color,
      showArrows,
      goBack,
      goForward,
      place
    } = this.props
    const {
      placeDistance,
      placeDetail,
      placeDetailAttributions
    } = this.state
    return (<div className='App-place front flipInY'>
      {placeDistance && <div className='distance flipInX'
        title='Place distance'
        style={{ color: color }}>
        {placeDistance}
      </div>}
      <div className='name' title='Place name'>{place.name}</div>
      {placeDetail && <PlaceDetail data={placeDetail} />}
      <div className='App-html-attributions place-detail' title='Place attributions'>
        {placeDetailAttributions.map((a) => a)}
      </div>
      {showArrows && <div className='panel left' title='Show previous place' onClick={goBack}>
        <img src={isNightMode ? ArrowLight : ArrowDark} height='28' alt='next' />
      </div>}
      {showArrows && <div className='panel right' title='Show next place' onClick={goForward}>
        <img src={isNightMode ? ArrowLight : ArrowDark} height='28' alt='prev' />
      </div>}
    </div>)
  }
}

export default PlaceFront
