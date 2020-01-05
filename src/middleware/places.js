import axios from 'axios'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import split from 'lodash/split'
import {
  setRequested,
  setError,
  setPlaces,
  setRandom
} from '../actions/places'

const MILES_TO_METERS = 1609.344

export const getNearbyPlaces = (dispatch, props) => {
  const {
    location,
    type,
    radius,
    priceLevel
  } = props

  let parsedType = split(type, ':')
  let params = {
    opennow: true,
    location: location,
    type: parsedType[0],
    keyword: parsedType.length > 1 ? parsedType[1] : ''
  }

  // Add radius
  if (!isEqual(radius, 0)) {
    params = {
      ...params,
      radius: parseInt(radius) * MILES_TO_METERS
    }
  } else {
    params = {
      ...params,
      rankby: 'distance'
    }
  }

  // Add price level
  if (!isEqual(priceLevel, 0)) {
    params = {
      ...params,
      minprice: parseInt(priceLevel),
      maxprice: parseInt(priceLevel)
    }
  }
 
  // Set loading
  dispatch(setRequested())

  // Request places
  axios.get('/nearby', {
    params: {
      query: JSON.stringify(params)
    }
  }).then((response) => {
    try {
      const places = get(response.data, 'results')
      const attributions = get(response.data, 'html_attributions', [])
      if (isEmpty(places)) {
        dispatch(setError())
      } else {
        dispatch(setPlaces(places, attributions))
        dispatch(setRandom())
      }
    } catch (error) {
      dispatch(setError())
    }
  })
  .catch((error) =>{
    console.log(error)
    dispatch(setError())
  })
}
