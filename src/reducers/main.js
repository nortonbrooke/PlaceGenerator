import Cookies from 'js-cookie'
import isEqual from 'lodash/isEqual'
import {
  SET_LOCATION_REQUESTED,
  SET_LOCATION_AUTHORIZED,
  SET_LOCATION,
  SET_LOCATION_ERROR,
  SET_NIGHT_MODE,
  COOKIES_AUTHORIZED
 } from '../actions/main'

const initialState = {
  location: [],
  locationRequested: false,
  locationError: false,
  locationAuthorized: isEqual(Cookies.get('locationAuthorized'), 'true'),
  nightMode: false,
  cookiesAuthorized: isEqual(Cookies.get('cookiesAuthorized'), 'true')
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION_REQUESTED:
      return {...state,
        locationRequested: action.requested
      }
    case SET_LOCATION_AUTHORIZED:
      return {...state,
        locationAuthorized: action.value
      }
    case SET_LOCATION:
      return {...state,
        location: action.location,
        locationRequested: false,
        locationError: false
      }
    case SET_LOCATION_ERROR:
      return {...state,
        location: [],
        locationRequested: false,
        locationError: true,
        errorMessage: action.message
      }
    case SET_NIGHT_MODE:
      return {...state,
        nightMode: action.nightMode
      }
    case COOKIES_AUTHORIZED:
      return {...state,
        cookiesAuthorized: true
      }
    default:
      return state
  }
}
