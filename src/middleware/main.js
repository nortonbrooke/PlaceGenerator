import { getNight } from '../util'
import get from 'lodash/get'
import {
  setLocationRequested,
  setLocation,
  setNightMode
} from '../actions/main'

export const getLocation = (dispatch) => {
  const success = (position) => {
    const latitude = get(position, 'coords.latitude')
    const longitude = get(position, 'coords.longitude')
    const isNight = getNight(latitude, longitude)
    dispatch(setLocation([latitude, longitude]))
    dispatch(setNightMode(isNight))
    dispatch(setLocationRequested(false))
  }

  const error = (error) => {
    console.log(error)
    this.setState({
      loading: false,
      location: [],
      error: true
    })
  }
  dispatch(setLocationRequested(true))
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error)
  }
}
