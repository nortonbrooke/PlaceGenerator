import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLocation } from './middleware/main'
import Ad from './components/Ad'
import Header from './components/Header'
import Footer from './components/Footer'
import Spinner from './components/Spinner'
import Places from './views/Places'
import classnames from 'classnames'
import './App.css'
import './Animate.css'

class App extends Component {
  componentDidMount () {
    const { getLocation } = this.props
    getLocation()
  }

  render () {
    const {
      locationRequested,
      nightMode
    } = this.props
    if (locationRequested) {
      return (<div className='App'>
        <Spinner className='bounce' />
      </div>)
    }
    return (
      <div className={classnames('App', {
        day: !nightMode,
        night: nightMode
      })}>
        <Header />
        <Places />
        <Ad />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  nightMode: state.main.nightMode,
  locationRequested: state.main.locationRequested,
  location: state.main.location
})

const mapDispatchToProps = dispatch => ({
  getLocation: () => getLocation(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
