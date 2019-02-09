import { connect } from 'react-redux'
import EmptyPlaces from './EmptyPlaces'

const mapStateToProps = state => ({
  location: state.main.location,
  requested: state.places.requested,
  error: state.places.error
})

const mapDispatchToProps = (dispatch, props) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmptyPlaces)
