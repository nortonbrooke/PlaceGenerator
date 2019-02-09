import { palette } from '../util'
import isEqual from 'lodash/isEqual'
import {
  SET_PREVIOUS,
  SET_NEXT,
  SET_RANDOM,
  RESET,
  SET_DISTANCE,
  SET_DETAIL
 } from '../actions/place'

const initialState = {
  index: 0,
  color: palette[0],
  distance: null,
  detail: null,
  attributions: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PREVIOUS: {
      const index = state.index - 1
      return {
        ...state,
        index: index,
        color: palette[index % palette.length]
      }
    }
    case SET_NEXT: {
      const index = state.index + 1
      return {
        ...state,
        index: index,
        color: palette[index % palette.length]
      }
    }
    case SET_RANDOM:
      const getRandom = () => Math.floor(Math.random() * 20)
      let index = getRandom()
      while (isEqual(state.index, index)) {
        index = getRandom()
      }
      return {
        ...state,
        index: index,
        color: '#0F9D58'
      }
    case RESET:
      return {
        ...state,
        index: 0
      }
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
