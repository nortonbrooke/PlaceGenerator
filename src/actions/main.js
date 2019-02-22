export const SET_LOCATION_REQUESTED = 'SET_LOCATION_REQUESTED'
export const SET_LOCATION = 'SET_LOCATION'
export const SET_LOCATION_AUTHORIZED = 'SET_LOCATION_AUTHORIZED'
export const SET_LOCATION_ERROR = 'SET_LOCATION_ERROR'
export const SET_NIGHT_MODE = 'SET_NIGHT_MODE'
export const COOKIES_AUTHORIZED = 'COOKIES_AUTHORIZED'
export const SET_HELP_ACKNOWLEDGED = 'SET_HELP_ACKNOWLEDGED'

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

export const setLocationAuthorized = (value) => {
  return {
    type: SET_LOCATION_AUTHORIZED,
    value: value
  }
}

export const setLocationError = (message) => {
  return {
    type: SET_LOCATION_ERROR,
    message: message
  }
}

export const setNightMode = (nightMode) => {
  return {
    type: SET_NIGHT_MODE,
    nightMode: nightMode
  }
}

export const setCookiesAuthorized = () => {
  return {
    type: COOKIES_AUTHORIZED
  }
}

export const setHelpAcknowledged = () => {
  return {
    type: SET_HELP_ACKNOWLEDGED
  }
}