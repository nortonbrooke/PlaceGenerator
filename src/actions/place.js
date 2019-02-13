export const SET_DISTANCE = 'SET_DISTANCE'
export const SET_DETAIL = 'SET_DETAIL'
export const SET_ATTRIBUTIONS = 'SET_ATTRIBUTIONS'

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
