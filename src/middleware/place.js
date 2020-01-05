import axios from 'axios'
import get from 'lodash/get'
import {
  setDistance,
  setDetail
} from '../actions/place'

export const getDetail = (dispatch, props) => {
  const { placeId } = props
  const params = {
    placeId: placeId
  }
  axios.get('/place', {
    params: params
  })
  .then((response) => {
    try {
      const place = get(response.data, 'result')
      const attributions = get(response.data, 'html_attributions', [])
      dispatch(setDetail(place, attributions))
    } catch (error) {
      dispatch(setDetail(null, []))
    }
  })
  .catch((error) =>{
    console.log(error)
    dispatch(setDetail(null, []))
  })
}

export const getDistance = (dispatch, props) => {
  const {
    location,
    placeId
  } = props
  const params = {
    location: location,
    placeId: placeId
  }
  
  axios.get('/distance', {
    params: params
  })
  .then((response) => {
    try {
      const rows = get(response.data, 'rows')
      const elements = get(rows[0], 'elements')
      const distance = get(elements[0], 'distance.text')
      dispatch(setDistance(distance))
    } catch (error) {
      dispatch(setDistance(null))
    }
  })
  .catch((error) =>{
    console.log(error)
    dispatch(setDistance(null))
  })
}
