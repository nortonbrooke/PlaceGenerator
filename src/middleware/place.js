import GoogleMaps from '@google/maps'
import { Constants } from '../util'
import get from 'lodash/get'
import {
  setDistance,
  setDetail
} from '../actions/place'

const googleMapsClient = GoogleMaps.createClient({
  key: Constants.GOOGLE_API_KEY
})

export const getDetail = (dispatch, props) => {
  const { placeId } = props
  const request = {
    placeid: placeId
  }
  googleMapsClient.place(request, (error, response) => {
    if (error) {
      console.log(error)
      dispatch(setDetail(null, []))
    }
    if (response) {
      const detail = response.json.result
      const attributions = get(response.json, 'html_attributions')
      dispatch(setDetail(detail, attributions))
    }
  })
}

export const getDistance = (dispatch, props) => {
  const {
    location,
    placeId
  } = props
  const request = {
    origins: [location],
    destinations: 'place_id:' + placeId,
    units: 'imperial'
  }
  googleMapsClient.distanceMatrix(request, (error, response) => {
    if (error) {
      console.log(error)
      dispatch(setDistance(null))
    }
    if (response) {
      const rows = response.json.rows
      const elements = get(rows[0], 'elements')
      const distance = get(elements[0], 'distance.text')
      dispatch(setDistance(distance))
    }
  })
}
