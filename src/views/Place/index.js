import { connect } from 'react-redux'
import get from 'lodash/get'
import {
  getDistance,
  getDetail
} from '../../api/place'
import Place from './Place'
import { getOpenHours } from '../../util'

const getPlace = (state) => state.places.place
const getPlaceId = (state) => {
  const place = getPlace(state);
  return get(place, 'place_id')
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
  placeId: getPlaceId(state),
  name: getPlaceName(state),
  distance: getPlaceDistance(state),
  detail: getPlaceDetail(state),
  hours: getOpenHours(new Date(), getPlaceDetail(state)),
  attributions: getPlaceAttributions(state)
})

const mapDispatchToProps = (dispatch, props) => ({
  getDistance: () => getDistance(dispatch, props),
  getDetail: () => getDetail(dispatch, props)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Place)
