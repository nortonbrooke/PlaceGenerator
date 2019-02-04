import React, { Component } from 'react'
import get from 'lodash/get'
import split from 'lodash/split'

class PlaceDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      copied: false
    }
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
    const { data } = this.props
    const { copied } = this.state
    // Open hours
    const date = new Date()
    const day = date.getDay()
    const weekdayHours = get(data, 'opening_hours.weekday_text', null)
    let hours = null
    try {
      hours = weekdayHours[Math.abs(day - 6)]
      hours = split(hours, ': ')[1]
    } catch (e) { }
    // Ratings
    const rating = get(data, 'rating')
    const totalRatings = get(data, 'user_ratings_total')
    // Address
    const address = get(data, 'formatted_address')
    // Google URL
    const url = get(data, 'url')
    return (<div className='App-place-detail flipInX'>
      <div className='hours' title='Place hours today'>
        {hours && split(hours, ',').map((h) => <span key={h}>{h}</span>)}
      </div>
      <div title='Place rating'>
        {rating && <span>{rating} &#9733; {totalRatings} review{totalRatings > 1 ? 's' : ''}</span>}
      </div>
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
    </div>)
  }
}

export default PlaceDetail
