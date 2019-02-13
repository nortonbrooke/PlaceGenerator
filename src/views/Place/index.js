import { connect } from 'react-redux'
import { getOpenHours } from '../../util'
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
const getName = (state) => {
  const place = getPlace(state)
  return get(place, 'name')
}
const mapStateToProps = state => ({
  nightMode: state.main.nightMode,
  distance: state.place.distance,
  color: state.places.color,
  name: getName(state),
  hours: getOpenHours(new Date(), state.place.detail),
  priceLevel: get(state.place.detail, 'price_level'),
  rating: get(state.place.detail, 'rating'),
  totalRatings: get(state.place.detail, 'user_ratings_total'),
  address: get(state.place.detail, 'formatted_address'),
  url: get(state.place.detail, 'url'),
  attributions: state.place.attributions
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
