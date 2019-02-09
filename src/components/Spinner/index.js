import { connect } from 'react-redux'
import Spinner from './Spinner'

const mapStateToProps = state => ({
  nightMode: state.main.nightMode
})

const mapDispatchToProps = dispatch => ({ })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Spinner)
