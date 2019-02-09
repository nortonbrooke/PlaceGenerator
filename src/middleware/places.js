import GoogleMaps from '@google/maps'
import { Constants } from '../util'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import split from 'lodash/split'
import {
  setRequested,
  setError,
  setPlaces
} from '../actions/places'

const googleMapsClient = GoogleMaps.createClient({
  key: Constants.GOOGLE_API_KEY
})

export const getNearbyPlaces = (dispatch, props) => {
  const {
    location,
    radius,
    type
  } = props
  let parsedType = split(type, ':')
  let request = {
    location: location,
    type: parsedType[0],
    keyword: parsedType.length > 1 ? parsedType[1] : '',
    opennow: true
  }
  if (!isEqual(radius, 0)) {
    request = {
      ...request,
      radius: radius * Constants.MILES_TO_METERS
    }
  } else {
    request = {
      ...request,
      rankby: 'distance'
    }
  }
  dispatch(setRequested())
  googleMapsClient.placesNearby(request, (error, response) => {
    if (error) {
      console.log(error)
      dispatch(setError())
    }
    if (response) {
      const places = response.json.results
      const attributions = get(response.json, 'html_attributions')
      if (isEmpty(places)) {
        dispatch(setError())
      } else {
        dispatch(setPlaces(places, attributions))
      }
    }
  })
}
