import { connect } from 'react-redux'
import { getLocation } from '../../middleware/main'
import EmptyPlaces from './EmptyPlaces'

const mapStateToProps = state => ({
  location: state.main.location,
  locationRequested: state.main.locationRequested,
  placesRequested: state.places.requested,
  error: state.places.error
})

const mapDispatchToProps = (dispatch, props) => ({
  getLocation: () => getLocation(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyPlaces)
