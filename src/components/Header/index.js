import { connect } from 'react-redux'
import { setNightMode } from '../../actions/main'
import Header from './Header'

const mapStateToProps = state => ({
  nightMode: state.main.nightMode
})

const mapDispatchToProps = dispatch => ({
  setNightMode: (nightMode) => dispatch(setNightMode(nightMode))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
