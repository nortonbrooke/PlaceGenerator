export const SET_REQUESTED = 'SET_REQUESTED'
export const SET_ERROR = 'SET_ERROR'
export const SET_PLACES = 'SET_PLACES'
export const SET_CATEGORY = 'SET_CATEGORY'
export const SET_TYPE = 'SET_TYPE'
export const SET_RADIUS = 'SET_RADIUS'
export const SET_PRICE_LEVEL = 'SET_PRICE_LEVEL'
export const SET_PLACE = 'SET_PLACE'
export const SET_RANDOM_PLACE = 'SET_RANDOM_PLACE'
export const UPDATE_PLACE = 'UPDATE_PLACE'

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

export const setPriceLevel = (priceLevel) => {
  return {
    type: SET_PRICE_LEVEL,
    priceLevel: priceLevel
  }
}

export const setPlace = (id) => {
  return {
    type: SET_PLACE,
    id: id
  }
}

export const setRandomPlace = () => {
  return {
    type: SET_RANDOM_PLACE
  }
}

export const updatePlace = (data) => {
  return {
    type: UPDATE_PLACE,
    data: data
  }
}