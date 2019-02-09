import { connect } from 'react-redux'
import { toggleFooter } from '../../actions/main'
import Footer from './Footer'

const mapStateToProps = state => ({
  nightMode: state.main.nightMode,
  showFooter: state.main.showFooter
})

const mapDispatchToProps = dispatch => ({
  toggleFooter: () => dispatch(toggleFooter())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
