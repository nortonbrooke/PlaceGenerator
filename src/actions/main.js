export const SET_LOCATION_REQUESTED = 'SET_LOCATION_REQUESTED'
export const SET_LOCATION = 'SET_LOCATION'
export const SET_NIGHT_MODE = 'SET_NIGHT_MODE'
export const TOGGLE_COOKIE_BANNER = 'TOGGLE_COOKIE_BANNER'

export const setLocationRequested = (requested) => {
  return {
    type: SET_LOCATION_REQUESTED,
    requested: requested
  }
}

export const setLocation = (location) => {
  return {
    type: SET_LOCATION,
    location: location
  }
}

export const setNightMode = (nightMode) => {
  return {
    type: SET_NIGHT_MODE,
    nightMode: nightMode
  }
}

export const toggleCookieBanner = () => {
  return {
    type: TOGGLE_COOKIE_BANNER
  }
}
