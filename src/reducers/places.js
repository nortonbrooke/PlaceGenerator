import { Categories, getDefaultType } from '../Categories'
import { getNextRandom } from '../util'
import palette from '../palette'

import {
  SET_REQUESTED,
  SET_ERROR,
  SET_PLACES,
  SET_CATEGORY,
  SET_TYPE,
  SET_RADIUS,
  SET_PRICE_LEVEL,
  SET_PLACE,
  SET_RANDOM_PLACE,
  UPDATE_PLACE
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
  place: null,
  index: 0,
  paletteIndex: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_REQUESTED:
      return {
        ...state,
        requested: true
      }
    case SET_ERROR:
      return {
        ...state,
        places: [],
        attributions: [],
        requested: false,
        error: true
      }
    case SET_PLACES:
      return {
        ...state,
        places: action.places,
        attributions: action.attributions,
        requested: false,
        error: false
      }
    case SET_CATEGORY:
      return {
        ...state,
        category: action.category,
        type: getDefaultType(action.category),
        places: [],
        attributions: [],
        error: false
      }
    case SET_TYPE:
      return {
        ...state,
        type: action.categoryType,
        places: [],
        attributions: [],
        error: false
      }
    case SET_RADIUS:
      return {
        ...state,
        radius: action.radius,
        places: [],
        attributions: [],
        error: false
      }
    case SET_PRICE_LEVEL:
      return {
        ...state,
        priceLevel: action.priceLevel,
        places: [],
        attributions: [],
        error: false
      }
    case SET_PLACE: {
      const place = state.places.find((place) => place.id === action.id);
      const index = state.places.indexOf(place)
      return {
        ...state,
        place: place,
        index: index,
        color: palette[state.paletteIndex % palette.length],
        paletteIndex: state.paletteIndex + 1
      }
    }
    case SET_RANDOM_PLACE: {
      const index = getNextRandom(state.index, state.places.length)
      const place = state.places[index]
      return {
        ...state,
        place: place,
        index: index,
        color: palette[state.paletteIndex % palette.length],
        paletteIndex: state.paletteIndex + 1
      }
    }
    case UPDATE_PLACE: {
      const place = {
        ...state.place,
        ...action.data
      }
      const places = [...state.places]
      places[state.index] = place
      return {
        ...state,
        places: places,
        place: place
      }
    }
    default:
      return state
  }
}
