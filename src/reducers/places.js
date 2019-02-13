import { Categories, getDefaultType, palette } from '../util'
import isEqual from 'lodash/isEqual'

import {
  SET_REQUESTED,
  SET_ERROR,
  SET_PLACES,
  SET_CATEGORY,
  SET_TYPE,
  SET_RADIUS,
  SET_PRICE_LEVEL,
  SET_PREVIOUS,
  SET_NEXT,
  SET_RANDOM,
  RESET
 } from '../actions/places'

const initialState = {
  error: false,
  requested: false,
  places: [],
  attributions: [],
  category: Categories.food.id,
  type: Categories.food.defaultType,
  radius: 0,
  priceLevel: 0,
  index: 0,
  indexTracker: new Set(),
  paletteIndex: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REQUESTED:
      return {...state,
        requested: true
      }
    case SET_ERROR:
      return {...state,
        places: [],
        attributions: [],
        requested: false,
        error: true
      }
    case SET_PLACES:
      return {...state,
        places: action.places,
        attributions: action.attributions,
        requested: false,
        error: false
      }
    case SET_CATEGORY:
      return {...state,
        category: action.category,
        type: getDefaultType(action.category),
        places: [],
        attributions: [],
        error: false
      }
    case SET_TYPE:
      return {...state,
        type: action.categoryType,
        places: [],
        attributions: [],
        error: false
      }
    case SET_RADIUS:
      return {...state,
        radius: action.radius,
        places: [],
        attributions: [],
        error: false
      }
    case SET_PRICE_LEVEL:
      return {...state,
        priceLevel: action.priceLevel,
        places: [],
        attributions: [],
        error: false
      }
    case SET_PREVIOUS: {
      return {
        ...state,
        index: state.index + 1,
        color: palette[state.paletteIndex % palette.length],
        paletteIndex: state.paletteIndex + 1
      }
    }
    case SET_NEXT: {
      return {
        ...state,
        index: state.index + 1,
        color: palette[state.paletteIndex % palette.length],
        paletteIndex: state.paletteIndex + 1
      }
    }
    case SET_RANDOM:
      const available = action.count || state.places.length
      const getRandom = () => Math.floor(Math.random() * available)
      let tracker = state.indexTracker
      if (isEqual(tracker.size, available)) {
        tracker = new Set()
      }
      let index = getRandom()
      while (tracker.has(index)) {
        index = getRandom()
      }
      tracker.add(index)
      return {
        ...state,
        index: index,
        indexTracker: tracker,
        color: palette[state.paletteIndex % palette.length],
        paletteIndex: state.paletteIndex + 1
      }
    case RESET:
      return {
        ...state,
        index: 0
      }
    default:
      return state
  }
}
