import { Categories, getDefaultType } from '../Categories'
import Palette from '../Palette'

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
  RESET,
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
  index: 0,
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
        color: Palette[state.paletteIndex % Palette.length],
        paletteIndex: state.paletteIndex + 1
      }
    }
    case SET_NEXT: {
      return {
        ...state,
        index: state.index + 1,
        color: Palette[state.paletteIndex % Palette.length],
        paletteIndex: state.paletteIndex + 1
      }
    }
    case SET_RANDOM: {
      let index = Math.floor(Math.random() * state.places.length)
      return {
        ...state,
        index: index,
        color: Palette[state.paletteIndex % Palette.length],
        paletteIndex: state.paletteIndex + 1
      }
    }
    case UPDATE_PLACE: {
      const places = [...state.places]
      const place =  {
        ...places[state.index],
        ...action.data
      }
      places[state.index] = place;
      return {...state,
        places: places
      }
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
