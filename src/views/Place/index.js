import { connect } from 'react-redux'
import get from 'lodash/get'
import {
  getDistance,
  getDetail
} from '../../middleware/place'
import {
  setPrevious,
  setNext,
  setRandom
} from '../../actions/places'
import Place from './Place'

const getIndex = (state) => state.places.index
const getPlaces = (state) => state.places.places
const getPlace = (state) => {
  const places = getPlaces(state)
  const index = getIndex(state)
  return places[Math.abs(index) % places.length]
}
const getPlaceName = (state) => {
  const place = getPlace(state)
  return get(place, 'name')
}
const getPlaceDistance = (state) => {
  const place = getPlace(state)
  return get(place, 'distance')
}
const getPlaceDetail = (state) => {
  const place = getPlace(state)
  return get(place, 'detail')
}
const getPlaceAttributions = (state) => {
  const place = getPlace(state)
  return get(place, 'attributions')
}
const mapStateToProps = state => ({
  nightMode: state.main.nightMode,
  color: state.places.color,
  name: getPlaceName(state),
  distance: getPlaceDistance(state),
  detail: getPlaceDetail(state),
  attributions: getPlaceAttributions(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  getDistance: () => getDistance(dispatch, props),
  getDetail: () => getDetail(dispatch, props),
  setPrevious: () => dispatch(setPrevious()),
  setNext: () => dispatch(setNext()),
  setRandom: () => dispatch(setRandom())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Place)
