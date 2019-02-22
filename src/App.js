import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { cookieAuthorization } from './middleware/main'
import Alert from './components/Alert'
import Header from './components/Header'
import Footer from './components/Footer'
import Places from './views/Places'
import TermsOfService from './views/Legal/TermsOfService'
import PrivacyPolicy from './views/Legal/PrivacyPolicy'
import CookiePolicy from './views/Legal/CookiePolicy'
import classnames from 'classnames'
import './App.css'
import './Animate.css'

class App extends Component {
  render () {
    const {
      nightMode,
      cookiesAuthorized,
      authorizeCookieUse
    } = this.props

    const CookieBanner = () => (<Alert className='bottom'>
      <p>
        This site uses cookies to offer you a better experience, analyze site traffic, and serve targeted advertisements.
        By continuing to use this site, you consent to the use of cookies outlined in our <Link to='/cookies'>Cookie Policy</Link>.
      </p>
      <button
        className='small'
        onClick={() => authorizeCookieUse()}>
        Accept
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
                    day: !nightMode,
                    night: nightMode
                  })}
                >
                  <Header />
                  <Places />
                  {!cookiesAuthorized && <CookieBanner />}
                  <Footer />
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
  cookiesAuthorized: state.main.cookiesAuthorized
})

const mapDispatchToProps = dispatch => ({
  authorizeCookieUse: () => cookieAuthorization(dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
