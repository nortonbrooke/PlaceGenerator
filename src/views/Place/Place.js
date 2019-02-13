import React, { Component } from 'react'
import noop from 'lodash/noop'
import { concat } from '../../util'
import './Place.css'

class Place extends Component {
  constructor (props) {
    super(props)
    this.state = {
      copied: false
    }
  }

  componentDidMount () {
    const {
      getDistance,
      getDetail
    } = this.props
    getDistance()
    getDetail()
  }

  copyAddress () {
    if (this.addressInput) {
      this.addressInput.select()
      document.execCommand('copy')
      this.setState({ copied: true })
    }
  }

  openTab (url) {
    window.open(url, '_newtab')
  }

  render () {
    const {
      color,
      name,
      distance,
      hours,
      priceLevel,
      rating,
      totalRatings,
      address,
      url,
      attributions
    } = this.props
    const { copied } = this.state
    return (<div className='App-place flipInY'
      style={{borderColor: color}}>
      <div className='content'>
        {distance && <div className='distance flipInX'
          title='Place distance'
          style={{ color: color }}>
          {distance}
        </div>}
        <div className='name'
          title={name}>
          {name}
        </div>
        <div className='detail flipInX'>
          {hours && <div className='hours'
            title="Today's hours">
            {hours.map((h) => <span key={h}>{h}</span>)}
          </div>}
          <div className='stats'>
            {rating && <div title='Rating'>
              <span>{rating} &#9733; {totalRatings} review{totalRatings > 1 ? 's' : ''}</span>
            </div>}
            {priceLevel && <div className='price' title='Price Level'>{concat(priceLevel, '$')}</div>}
          </div>
          <input type='text' value={address} ref={(el) => { this.addressInput = el }} />
          <div>
            {address && <button className='small'
              title='Copy place address'
              onClick={() => this.copyAddress()}>
              {copied ? 'Copied' : 'Copy Address'}
            </button>}
            {url && <button className='small'
              title='Open place in Google'
              onClick={() => this.openTab(url)}>
              Open in Google
            </button>}
          </div>
          {attributions && <div className='attributions'
            title='Place attributions'>
            {attributions.map((a) => a)}
          </div>}
        </div>
      </div>
    </div>)
  }
}

Place.defaultProps = {
  getDistance: noop,
  getDetail: noop
}

export default Place
