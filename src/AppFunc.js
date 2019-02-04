import isEqual from 'lodash/isEqual'
import Constants from './util/Constants'

const AppFunc = (prevState, currentState) => {
  const { EVENTS } = Constants
  const {
    location,
    category,
    type,
    placeIndex,
    randomPlaceIndex,
    customRadius,
    customRadiusEnabled,
    reset
  } = currentState

  const locationChanged = !isEqual(prevState.location, location)
  const categoryChanged = !isEqual(prevState.category, category)
  const typeChanged = !isEqual(prevState.type, type)
  const radiusToggled = !isEqual(prevState.customRadiusEnabled, customRadiusEnabled)
  const radiusChanged = !isEqual(prevState.customRadius, customRadius)

  if (locationChanged ||
      categoryChanged || typeChanged ||
      radiusToggled || radiusChanged) {
    // console.log('GET_NEARBY_PLACES')
    return EVENTS.GET_NEARBY_PLACES
  } else {
    if (!isEqual(prevState.randomPlaceIndex, randomPlaceIndex)) {
      // console.log('GET_RANDOM_PLACE', randomPlaceIndex)
      return EVENTS.GET_RANDOM_PLACE
    } else if (prevState.placeIndex > placeIndex) {
      // console.log('GET_PREVIOUS_PLACE', placeIndex)
      return EVENTS.GET_PREVIOUS_PLACE
    } else if (prevState.placeIndex < placeIndex) {
      // console.log('GET_NEXT_PLACE', placeIndex)
      return EVENTS.GET_NEXT_PLACE
    } else if (!prevState.reset && reset) {
      // console.log('RESET_PLACES')
      return EVENTS.RESET_PLACES
    }
  }
}

export default AppFunc
