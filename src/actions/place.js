export const SET_NEXT = 'SET_NEXT'
export const SET_PREVIOUS = 'SET_PREVIOUS'
export const SET_RANDOM = 'SET_RANDOM'
export const RESET = 'RESET'
export const SET_DISTANCE = 'SET_DISTANCE'
export const SET_DETAIL = 'SET_DETAIL'
export const SET_ATTRIBUTIONS = 'SET_ATTRIBUTIONS'

export const setPrevious = () => {
  return {
    type: SET_PREVIOUS
  }
}

export const setNext = () => {
  return {
    type: SET_NEXT
  }
}

export const setRandom = () => {
  return {
    type: SET_RANDOM
  }
}

export const reset = () => {
  return {
    type: RESET
  }
}

export const setDistance = (distance) => {
  return {
    type: SET_DISTANCE,
    distance: distance
  }
}

export const setDetail = (detail, attributions) => {
  return {
    type: SET_DETAIL,
    detail: detail,
    attributions: attributions
  }
}
