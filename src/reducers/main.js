import {
  SET_LOCATION_REQUESTED,
  SET_LOCATION,
  SET_NIGHT_MODE,
  TOGGLE_FOOTER
 } from '../actions/main'

const initialState = {
  locationRequested: false,
  location: [],
  nightMode: false,
  showFooter: false
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
    case TOGGLE_FOOTER:
      return {...state,
        showFooter: !state.showFooter
      }
    default:
      return state
  }
}
