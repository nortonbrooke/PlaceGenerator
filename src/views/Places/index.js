import { connect } from 'react-redux'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { getNearbyPlaces } from '../../middleware/places'
import {
  setCategory,
  setType,
  setRadius
} from '../../actions/places'
import {
  setRandom,
  reset
} from '../../actions/place'
import Places from './Places'

const getIndex = (state) => state.place.index
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
  nightMode: state.main.nightMode,
  requested: state.places.requested,
  places: getPlace(state),
  attributions: state.places.attributions,
  placeId: getPlaceId(state),
  category: state.places.category,
  type: state.places.type,
  radius: state.places.radius,
  radiusToggled: !isEqual(state.places.radius, 0)
})

const mapDispatchToProps = (dispatch) => ({
  setCategory: (category) => dispatch(setCategory(category)),
  setType: (type) => dispatch(setType(type)),
  setRadius: (radius) => dispatch(setRadius(radius)),
  setRandom: (count) => dispatch(setRandom(count)),
  reset: () => dispatch(reset()),
  getNearbyPlaces: (props) => getNearbyPlaces(dispatch, props)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Places)
