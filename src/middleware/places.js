import axios from 'axios'
import { Constants } from '../util'
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
  if (!isEqual(radius, 0)) {
    params = {
      ...params,
      radius: parseInt(radius) * Constants.MILES_TO_METERS
    }
  } else {
    params = {
      ...params,
      rankby: 'distance'
    }
  }
  if (!isEqual(priceLevel, 0)) {
    params = {
      ...params,
      minprice: parseInt(priceLevel),
      maxprice: parseInt(priceLevel)
    }
  }
  dispatch(setRequested())
  axios.get('/nearby', {
    params: {
      query: JSON.stringify(params)
    }
  })
  .then((response) => {
    const places = get(response.data, 'results')
    const attributions = get(response.data, 'html_attributions', [])
    if (isEmpty(places)) {
      dispatch(setError())
    } else {
      dispatch(setRandom(places.length))
      dispatch(setPlaces(places, attributions))
    }
  })
  .catch((error) =>{
    console.log(error)
    dispatch(setError())
  })
}
