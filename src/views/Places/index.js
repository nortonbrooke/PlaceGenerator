import { connect } from 'react-redux'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import {
  clearLocation,
  getLocation
} from '../../api/main'
import { getNearbyPlaces } from '../../api/places'
import {
  setCategory,
  setType,
  setRadius,
  setPriceLevel,
  setPlace,
  setRandomPlace
} from '../../actions/places'
import Places from './Places'

const getPlaces = (state) => state.places.places
const getPlace = (state) => state.places.place
const getSelectedId = (state) => {
  const place = getPlace(state);
  return get(place, 'id')
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
  places: getPlaces(state),
  attributions: state.places.attributions,
  category: state.places.category,
  type: state.places.type,
  radius: state.places.radius,
  radiusToggled: !isEqual(state.places.radius, 0),
  priceLevel: state.places.priceLevel,
  priceLevelToggled: !isEqual(state.places.priceLevel, 0),
  selectedId: getSelectedId(state),
  placeId: getPlaceId(state)
})

const mapDispatchToProps = (dispatch) => ({
  getLocation: () => getLocation(dispatch),
  clearLocation: () => clearLocation(dispatch),
  setCategory: (category) => dispatch(setCategory(category)),
  setType: (type) => dispatch(setType(type)),
  setRadius: (radius) => dispatch(setRadius(radius)),
  setPriceLevel: (priceLevel) => dispatch(setPriceLevel(priceLevel)),
  setPlace: (id) => dispatch(setPlace(id)),
  setRandomPlace: () => dispatch(setRandomPlace()),
  getNearbyPlaces: (props) => getNearbyPlaces(dispatch, props)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Places)
