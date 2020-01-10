import Cookies from 'js-cookie'
import { getNight } from '../util'
import get from 'lodash/get'
import {
  setLocationRequested,
  setLocation,
  setLocationAuthorized,
  setNightMode,
  setCookiesAuthorized,
  setLocationError,
  setHelpAcknowledged
} from '../actions/main'

export const getLocation = (dispatch) => {
  const success = (position) => {
    setLocationCookie(dispatch, true)
    const latitude = get(position, 'coords.latitude')
    const longitude = get(position, 'coords.longitude')
    const isNight = getNight(latitude, longitude)
    dispatch(setNightMode(isNight))
    dispatch(setLocation([latitude, longitude]))
  }

  const error = (error) => {
    console.log(error)
    let errorMessage
    switch (error.code) {
      case 1: /* PERMISSION_DENIED */
        setLocationCookie(dispatch, false)
        errorMessage = 'Your location has been blocked. Please enable your location for this site in your browser settings.'
        dispatch(setLocationError(errorMessage))
        break
      case 2: /* POSITION_UNAVAILABLE */
      case 3: /* TIMEOUT */
        setLocationCookie(dispatch, true)
        errorMessage = 'Your location is unavailable at this time.'
        dispatch(setLocationError(errorMessage))
        break
      default:
        setLocationCookie(dispatch, false)
        errorMessage = 'There was an error in retrieving your location.'
        dispatch(setLocationError(errorMessage))
        break
    }
  }
  dispatch(setLocationRequested(true))
  if (navigator && navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error)
  }
}

export const clearLocation = (dispatch) => {
  if (navigator && navigator.clearWatch) {
    navigator.clearWatch()
  }
  dispatch(setLocation([]))
}

const setLocationCookie = (dispatch, value) => {
  Cookies.set('locationAuthorized', value, { expires: Infinity })
  dispatch(setLocationAuthorized(value))
}

export const cookieAuthorization = (dispatch) => {
  Cookies.set('cookiesAuthorized', true, { expires: Infinity })
  dispatch(setCookiesAuthorized())
}

export const acknowledgeHelp = (dispatch) => {
  Cookies.set('helpAcknowledged', true, { expires: Infinity })
  dispatch(setHelpAcknowledged())
}