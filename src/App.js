import React, { Component } from 'react'
import { getSunrise, getSunset } from 'sunrise-sunset-js'
import _ from 'lodash'
import shortid from 'shortid'
import classnames from 'classnames'
/* Util */
import AppFunc from './AppFunc'
import Constants from './util/Constants'
import Palette from './util/Palette'
/* CSS */
import './Animate.css'
import './App.css'
import './AppDay.css'
import './AppNight.css'
/* Components */
import Nav from './components/Nav'
import Slider from './components/Slider'
import Selector from './components/Selector'
import Spinner from './components/Spinner'
import PlaceLoading from './components/PlaceLoading'
import PlaceDisabled from './components/PlaceDisabled'
import PlaceFront from './components/PlaceFront'
import PlaceBack from './components/PlaceBack'
import Categories from './util/Categories'
/* Images */
import LogoDark from './images/logo-blue.svg'
import LogoLight from './images/logo-white.svg'
import MarkerLight from './images/icon-white.svg'
import MarkerDark from './images/icon-blue.svg'
import Sun from './images/icon-sun.svg'
import Moon from './images/icon-moon.svg'
import Radius from './components/RadiusIcon'
import Clover from './images/icon-clover.svg'
import Refresh from './images/icon-refresh.svg'
import PoweredByGoogleDark from './images/powered-by-google-black.png'
import PoweredByGoogleLight from './images/powered-by-google-white.png'
/* Mailchimp */
import MailchimpSubscribe from 'react-mailchimp-subscribe'
import SubscribeForm from './components/SubscribeForm'

const googleMapsClient = require('@google/maps').createClient({
  key: Constants.GOOGLE_API_KEY
})

export const initialState = {
  isNightMode: true,
  category: Categories.food,
  type: Categories.food.defaultType,
  location: [],
  customRadius: 5,
  customRadiusEnabled: false,
  nearbyPlaces: [],
  placeIndex: -1,
  place: null,
  direction: 1,
  randomPlaceIndex: -1,
  randomActive: false,
  randomTracker: new Set(),
  loading: false,
  error: false,
  nearbyPlacesAttributions: []
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  componentDidMount () {
    this.setState({location: [28.5383, -81.3792]})
    return
    const success = (position) => {
      const latitude = _.get(position, 'coords.latitude')
      const longitude = _.get(position, 'coords.longitude')
      const date = new Date()
      const sunrise = getSunrise(latitude, longitude, date)
      const sunriseDiff = sunrise - date
      const sunset = getSunset(latitude, longitude, date)
      const sunsetDiff = sunset - date
      this.setState({
        loading: false,
        location: [latitude, longitude],
        isNightMode: sunriseDiff <= sunsetDiff
      })
    }

    const error = (error) => {
      console.log(error)
      this.setState({
        loading: false,
        location: [],
        error: true
      })
    }
    this.setState({ loading: true })
    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const { EVENTS } = Constants
    const event = AppFunc(prevState, this.state)
    switch (event) {
      case EVENTS.GET_NEARBY_PLACES:
        this.getNearbyPlaces()
        break
      case EVENTS.GET_RANDOM_PLACE:
        this.getRandomPlace()
        break
      case EVENTS.GET_PREVIOUS_PLACE:
      case EVENTS.GET_NEXT_PLACE:
        this.getPlace()
        break
      case EVENTS.RESET_PLACES:
        this.resetPlaces()
        break
      default:
        break
    }
  }

  switchMode () {
    const { isNightMode } = this.state
    this.setState({ isNightMode: !isNightMode })
  }

  toggleCategory (category) {
    if (!_.isEqual(category, this.state.category)) {
      this.setState({
        category: category,
        type: category.defaultType,
        nearbyPlaces: [],
        placeIndex: -1,
        place: null
      })
    }
  }

  changeType (type) {
    this.setState({
      type: type,
      nearbyPlaces: [],
      placeIndex: -1,
      place: null
    })
  }

  toggleCustomRadius () {
    const { customRadiusEnabled } = this.state
    this.setState({
      customRadius: 5,
      customRadiusEnabled: !customRadiusEnabled,
      place: null,
      nearbyPlaces: []
    })
  }

  setCustomRadius (value) {
    this.setState({
      customRadius: parseInt(value),
      place: null,
      placeIndex: -1,
      nearbyPlaces: []
    })
  }

  getNearbyPlaces () {
    const {
      location,
      customRadius,
      customRadiusEnabled,
      type
    } = this.state
    let parsedType = _.split(type, ':')
    let request = {
      location: location,
      type: parsedType[0],
      keyword: parsedType.length > 1 ? parsedType[1] : '',
      opennow: true
    }
    if (customRadiusEnabled) {
      request = {
        ...request,
        radius: customRadius * Constants.MILES_TO_METERS,
        rankby: 'prominence'
      }
    } else {
      request = {
        ...request,
        rankby: 'distance'
      }
    }
    this.setState({ loading: true })
    googleMapsClient.placesNearby(request, (error, response) => {
      if (error) {
        console.log(error)
        this.setState({ loading: false, error: true })
      }
      if (response) {
        this.setState({
          loading: false,
          nearbyPlaces: response.json.results,
          nearbyPlacesAttributions: response.json.html_attributions
        })
      }
    })
  }

  showNext (e) {
    e.stopPropagation()
    const { placeIndex } = this.state
    this.setState({
      place: null,
      placeIndex: placeIndex + 1
    })
  }

  showPrevious (e) {
    e.stopPropagation()
    const { placeIndex } = this.state
    this.setState({
      place: null,
      placeIndex: placeIndex - 1
    })
  }

  getPlace () {
    const {
      placeIndex,
      nearbyPlaces
     } = this.state
    this.setState({
      place: nearbyPlaces[placeIndex % nearbyPlaces.length],
      randomActive: false
    })
  }

  showRandom () {
    const {
      randomTracker,
      nearbyPlaces
    } = this.state
    const getRandom = () => {
      return Math.floor(Math.random() * nearbyPlaces.length)
    }
    let tracker = randomTracker
    if (_.isEqual(tracker.size, nearbyPlaces.length)) {
      tracker = new Set()
    }
    let index = getRandom()
    while (tracker.has(index)) {
      index = getRandom()
    }
    tracker.add(index)
    this.setState({
      place: null,
      randomPlaceIndex: index,
      randomTracker: tracker
    })
  }

  getRandomPlace () {
    const {
      randomPlaceIndex,
      nearbyPlaces
    } = this.state
    this.setState({
      place: nearbyPlaces[randomPlaceIndex % nearbyPlaces.length],
      randomActive: true
    })
  }

  reset () {
    this.setState({ reset: true })
  }

  resetPlaces () {
    this.setState({
      place: null,
      placeIndex: -1,
      reset: false
    })
  }

  render () {
    const {
      isNightMode,
      error,
      loading,
      location,
      customRadius,
      customRadiusEnabled,
      category,
      type,
      nearbyPlaces,
      nearbyPlacesAttributions,
      place,
      placeIndex,
      randomActive
    } = this.state

    const AppPlace = () => {
      if (error && _.isEmpty(location)) {
        return (<PlaceBack>Please enable your location</PlaceBack>)
      }
      if (loading && _.isEmpty(nearbyPlaces)) {
        return <PlaceLoading />
      }
      if (_.isEmpty(nearbyPlaces)) {
        return <PlaceDisabled>
          <img src={isNightMode ? MarkerLight : MarkerDark} key={shortid.generate()} alt='Disabled' width={80} />
        </PlaceDisabled>
      }
      if (_.isNil(place)) {
        return <PlaceBack onClick={(e) => this.showNext(e)}>
          <img src={MarkerLight} className='pulse' alt='Click Me' width={80} />
        </PlaceBack>
      }
      return <PlaceFront googleMapsClient={googleMapsClient}
        place={place}
        location={location}
        showArrows={!randomActive}
        isNightMode={isNightMode}
        goBack={(e) => this.showPrevious(e)}
        goForward={(e) => this.showNext(e)}
        color={randomActive ? '#0F9D58' : Palette[placeIndex % Palette.length]} />
    }

    return (<div className={classnames('App', {
      'App-day': !isNightMode,
      'App-night': isNightMode
    })}>
      {isNightMode && <div>
        <div className='stars' key={shortid.generate()} />
        <div className='twinkling' key={shortid.generate()} />
      </div>}
      {loading && _.isEmpty(location) ? <Spinner isNightMode={isNightMode} />
        : (<div className='App-content'>
          <header className='App-header' onClick={() => this.switchMode()}>
            <img src={isNightMode ? LogoLight : LogoDark} key={shortid.generate()}
              width={165} alt='Waidoe' title='way&#x2022;doe' />
            <img src={isNightMode ? Moon : Sun} key={shortid.generate()}
              height={28} width={28}
              alt={isNightMode ? 'Moon' : 'Sun'}
              title='Switch mode' />
            <div className='keywords'>{Constants.KEYWORDS.join(' ')}</div>
          </header>
          <Nav selected={category}
            onClick={(category) => this.toggleCategory(category)} />
          {customRadiusEnabled && <Slider label='Radius'
            min={5} max={30} step={5} value={customRadius}
            onChange={(value) => this.setCustomRadius(value)} />}
          <div className='App-tool-bar'>
            <Selector selected={type}
              title='Select type'
              options={category.types}
              onChange={(type) => this.changeType(type)} />
            <button
              className='yellow'
              title='Change radius'
              onClick={() => this.toggleCustomRadius()}>
              <Radius />
            </button>
            <button
              className='green'
              title='Generate random place'
              disabled={_.isEmpty(nearbyPlaces)}
              onClick={() => this.showRandom()}>
              <img src={Clover} alt='Generate random place' width={20} height={20} />
            </button>
            <button
              className='red'
              disabled={_.isEmpty(nearbyPlaces)}
              title='Reset to first place'
              onClick={() => this.reset()}>
              <img src={Refresh} alt='Reset to first place' width={20} height={20} />
            </button>
          </div>
          <AppPlace />
          <div className='App-html-attributions nearby-list' title='Nearby places attributions'>
            {nearbyPlacesAttributions.map((a) => a)}
          </div>
          <img src={isNightMode ? PoweredByGoogleLight : PoweredByGoogleDark}
            height={18} width={144} alt='powered by Google' title='powred by Google' />
          <footer className='App-footer'>
            <MailchimpSubscribe
              url={Constants.MAILCHIMP_URL}
              render={({ subscribe, status, message }) => (
                <SubscribeForm
                  status={status}
                  message={message}
                  onValidated={formData => subscribe(formData)}
                />
              )}
            />
            <button className='small contact' title='Contact Waidoe'>
              <a href='mailto:contact.waidoe@gmail.com'>Contact</a>
            </button>
            <div>&copy; Waidoe 2019</div>
          </footer>
        </div>)}
    </div>)
  }
}

export default App
