import React, { Component } from 'react'
import noop from 'lodash/noop'
import ArrowLight from '../../assets/arrow-light.svg'
import ArrowDark from '../../assets/arrow-dark.svg'
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

  copyAddress (e) {
    e.stopPropagation()
    if (this.addressInput) {
      this.addressInput.select()
      document.execCommand('copy')
      this.setState({ copied: true })
    }
  }

  openTab (e, url) {
    e.stopPropagation()
    window.open(url, '_newtab')
  }

  render () {
    const {
      nightMode,
      color,
      name,
      distance,
      hours,
      rating,
      totalRatings,
      address,
      url,
      attributions,
      setPrevious,
      setNext
    } = this.props
    const { copied } = this.state
    return (<div className='App-place flipInY'>
      <div className='control left'
        title='Show previous place'
        onClick={setPrevious}>
        <img src={nightMode ? ArrowLight : ArrowDark}
          height={28}
          className='arrow'
          alt='Previous' />
      </div>
      <div className='content'>
        {distance && <div className='distance'
          title='Place distance'
          style={{ color: color }}>
          {distance}
        </div>}
        <div className='name'
          title={name}>
          {name}
        </div>
        <div className='detail'>
          {hours && <div className='hours'
            title='Place hours today'>
            {hours.map((h) => <span key={h}>{h}</span>)}
          </div>}
          {rating && <div title='Place rating'>
            <span>{rating} &#9733; {totalRatings} review{totalRatings > 1 ? 's' : ''}</span>
          </div>}
          <input type='text' defaultValue={address} ref={(el) => { this.addressInput = el }} />
          <div>
            {address && <button className='small'
              title='Copy place address'
              onClick={(e) => this.copyAddress(e)}>
              {copied ? 'Copied' : 'Copy Address'}
            </button>}
            {url && <button className='small'
              title='Open place in Google'
              onClick={(e) => this.openTab(e, url)}>
              Open in Google
            </button>}
          </div>
          {attributions && <div className='attributions'
            title='Place attributions'>
            {attributions.map((a) => a)}
          </div>}
        </div>
      </div>
      <div className='control right'
        title='Show next place'
        onClick={setNext}>
        <img src={nightMode ? ArrowLight : ArrowDark}
          height={28}
          className='arrow'
          alt='Next' />
      </div>
    </div>)
  }
}

Place.defaultProps = {
  getDistance: noop,
  getDetail: noop
}

export default Place
