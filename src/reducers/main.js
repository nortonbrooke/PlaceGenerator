import {
  SET_LOCATION_REQUESTED,
  SET_LOCATION,
  SET_NIGHT_MODE,
  TOGGLE_COOKIE_BANNER
 } from '../actions/main'

const initialState = {
  locationRequested: false,
  location: [],
  nightMode: false,
  showCookieBanner: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION_REQUESTED:
      return {...state,
        locationRequested: action.requested
      }
    case SET_LOCATION:
      return {...state,
        location: action.location,
        locationRequested: false
      }
    case SET_NIGHT_MODE:
      return {...state,
        nightMode: action.nightMode
      }
    case TOGGLE_COOKIE_BANNER:
      return {...state,
        showCookieBanner: !state.showCookieBanner
      }
    default:
      return state
  }
}
