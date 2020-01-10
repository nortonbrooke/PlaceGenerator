import { connect } from 'react-redux'
import Bubbles from './Bubbles'

const mapStateToProps = state => ({
    nightMode: state.main.nightMode,
    color: state.places.color,
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bubbles)  