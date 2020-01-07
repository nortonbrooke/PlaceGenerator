import axios from 'axios'
import get from 'lodash/get'
import {
  updatePlace
} from '../actions/places'

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
        dispatch(updatePlace({
          detail: place,
          attributions
        }))
      } catch (error) {
        dispatch(updatePlace({ 
          detail: null, 
          attributions: []
        }))
      }
    })
    .catch((error) => {
      console.log(error)
      dispatch(updatePlace({
        detail: null,
        attributions: []
      }))
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
        dispatch(updatePlace({ distance }))
      } catch (error) {
        dispatch(updatePlace({
          distance: null
        }))
      }
    })
    .catch((error) => {
      console.log(error)
      dispatch(updatePlace({
        distance: null
      }))
    })
}
