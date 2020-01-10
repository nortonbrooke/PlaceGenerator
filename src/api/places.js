import axios from 'axios'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import split from 'lodash/split'
import {
  setRequested,
  setError,
  setPlaces,
  setRandomPlace
} from '../actions/places'

export const getNearbyPlaces = (dispatch, props) => {
  const {
    location,
    type,
    radius,
    priceLevel
  } = props

  let parsedType = split(type, ':')
  let params = {
    location: location,
    type: parsedType[0],
    keyword: parsedType.length > 1 ? parsedType[1] : ''
  }

  // Add radius
  if (!isEqual(radius, 0)) {
    params = {
      ...params,
      radius: radius
    }
  }

  // Add price level
  if (!isEqual(priceLevel, 0)) {
    params = {
      ...params,
      minprice: 0,
      maxprice: priceLevel
    }
  }
 
  // Set loading
  dispatch(setRequested())

  // Request places
  axios.get('/api/maps/nearby', {
    params: params
  }).then((response) => {
    try {
      const places = get(response.data, 'results')
      const attributions = get(response.data, 'html_attributions', [])
      if (isEmpty(places)) {
        dispatch(setError())
      } else {
        dispatch(setPlaces(places, attributions))
        dispatch(setRandomPlace())
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
