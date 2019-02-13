import { connect } from 'react-redux'
import Footer from './Footer'

const mapStateToProps = state => ({
  nightMode: state.main.nightMode
})

const mapDispatchToProps = dispatch => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
