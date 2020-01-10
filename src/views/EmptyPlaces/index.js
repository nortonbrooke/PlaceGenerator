import { connect } from 'react-redux'
import { getLocation } from '../../api/main'
import EmptyPlaces from './EmptyPlaces'

const mapStateToProps = state => ({
  locationRequested: state.main.locationRequested,
  locationAuthorized: state.main.locationAuthorized,
  locationError: state.main.locationError,
  locationErrorMessage: state.main.errorMessage,
  placesRequested: state.places.requested,
  placesError: state.places.error
})

const mapDispatchToProps = (dispatch, props) => ({
  getLocation: () => getLocation(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyPlaces)
