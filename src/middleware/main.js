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
    dispatch(setNightMode(isNight))
    dispatch(setLocation([latitude, longitude]))
  }

  const error = (error) => {
    console.log(error)
    dispatch(setLocation([]))
  }
  dispatch(setLocationRequested(true))
  if (navigator && navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error)
  }
}

export const clearLocation = (dispatch) => {
  if (navigator && navigator.clearWatch) {
    navigator.clearWatch()
  }
  dispatch(setLocation([]))
}
