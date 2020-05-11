import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  cookieAuthorization,
  acknowledgeHelp
} from './api/main'
import Alert from './components/Alert'
import Footer from './components/Footer'
import Places from './views/Places'
import ErrorBoundary from './views/ErrorBoundary'
import TermsOfService from './views/Legal/TermsOfService'
import PrivacyPolicy from './views/Legal/PrivacyPolicy'
import CookiePolicy from './views/Legal/CookiePolicy'
import classnames from 'classnames'
import './App.css'
import './Animate.css'

class App extends Component {
  render() {
    const {
      nightMode,
      cookiesAuthorized,
      authorizeCookieUse
    } = this.props

    const CookieBanner = () => (<Alert>
      <p>
        By continuing to use this site, you consent to the use of cookies. <Link to='/cookies'>Read More</Link>.
      </p>
      <button
        className='small'
        onClick={() => authorizeCookieUse()}>
        Dismiss
    </button>
    </Alert>)

    return (
      <Router>
        <div>
          <Route
            exact
            path='/'
            render={() => {
              return (
                <div
                  className={classnames('App', {
                    'night-mode': nightMode
                  })}
                >
                  <ErrorBoundary>
                    <Places />
                    {!cookiesAuthorized && <CookieBanner />}
                    <Footer />
                  </ErrorBoundary>
                </div>
              )
            }}
          />
          <Route path='/terms' component={TermsOfService} />
          <Route path='/privacy' component={PrivacyPolicy} />
          <Route path='/cookies' component={CookiePolicy} />
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  nightMode: state.main.nightMode,
  helpAcknowledged: state.main.helpAcknowledged,
  cookiesAuthorized: state.main.cookiesAuthorized
})

const mapDispatchToProps = dispatch => ({
  acknowledgeHelp: () => acknowledgeHelp(dispatch),
  authorizeCookieUse: () => cookieAuthorization(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
