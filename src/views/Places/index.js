import { connect } from 'react-redux'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import {
  clearLocation,
  getLocation
} from '../../middleware/main'
import { getNearbyPlaces } from '../../middleware/places'
import {
  setCategory,
  setType,
  setRadius,
  setPriceLevel,
  setRandom,
  reset
} from '../../actions/places'
import Places from './Places'

const getIndex = (state) => state.places.index
const getPlaces = (state) => state.places.places
const getPlace = (state) => {
  const places = getPlaces(state)
  const index = getIndex(state)
  return places[Math.abs(index) % places.length]
}
const getPlaceId = (state) => {
  const place = getPlace(state)
  return get(place, 'place_id')
}

const mapStateToProps = state => ({
  location: state.main.location,
  locationAuthorized: state.main.locationAuthorized,
  nightMode: state.main.nightMode,
  requested: state.places.requested,
  places: getPlace(state),
  attributions: state.places.attributions,
  category: state.places.category,
  type: state.places.type,
  radius: state.places.radius,
  radiusToggled: !isEqual(state.places.radius, 0),
  priceLevel: state.places.priceLevel,
  priceLevelToggled: !isEqual(state.places.priceLevel, 0),
  index: state.places.index,
  placeId: getPlaceId(state)
})

const mapDispatchToProps = (dispatch) => ({
  getLocation: () => getLocation(dispatch),
  clearLocation: () => clearLocation(dispatch),
  setCategory: (category) => dispatch(setCategory(category)),
  setType: (type) => dispatch(setType(type)),
  setRadius: (radius) => dispatch(setRadius(radius)),
  setPriceLevel: (priceLevel) => dispatch(setPriceLevel(priceLevel)),
  setRandom: () => dispatch(setRandom()),
  reset: () => dispatch(reset()),
  getNearbyPlaces: (props) => getNearbyPlaces(dispatch, props)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Places)
