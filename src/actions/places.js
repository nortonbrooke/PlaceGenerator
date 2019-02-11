export const SET_REQUESTED = 'SET_REQUESTED'
export const SET_ERROR = 'SET_ERROR'
export const SET_PLACES = 'SET_PLACES'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_TYPE = 'SET_TYPE'
export const SET_RADIUS = 'SET_RADIUS'

export const setRequested = () => {
  return {
    type: SET_REQUESTED
  }
}

export const setError = () => {
  return {
    type: SET_ERROR
  }
}

export const setPlaces = (places, attributions) => {
  return {
    type: SET_PLACES,
    places: places,
    attributions: attributions
  }
}

export const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category: category
  }
}

export const setType = (type) => {
  return {
    type: SET_TYPE,
    categoryType: type
  }
}

export const setRadius = (radius) => {
  return {
    type: SET_RADIUS,
    radius: radius
  }
}
