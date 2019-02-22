import { connect } from 'react-redux'
import Select from './Select'

const mapStateToProps = state => ({
  nightMode: state.main.nightMode
})

const mapDispatchToProps = dispatch => ({ })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select)
