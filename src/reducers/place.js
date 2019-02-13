import {
  SET_DISTANCE,
  SET_DETAIL
 } from '../actions/place'

const initialState = {
  distance: null,
  detail: null,
  attributions: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DISTANCE:
      return {...state,
        distance: action.distance
      }
    case SET_DETAIL:
      return {...state,
        detail: action.detail,
        attributions: action.attributions
      }
    default:
      return state
  }
}
