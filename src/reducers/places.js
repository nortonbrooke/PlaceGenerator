import { Categories, getDefaultType } from '../util'

import {
  SET_REQUESTED,
  SET_ERROR,
  SET_PLACES,
  SET_CATEGORY,
  SET_TYPE,
  SET_RADIUS
 } from '../actions/places'

const initialState = {
  error: false,
  requested: false,
  places: [],
  attributions: [],
  category: Categories.food.id,
  type: Categories.food.defaultType,
  radius: 0
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
    default:
      return state
  }
}
