import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
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

  componentDidMount() {
    const {
      location,
      placeId,
      getDistance,
      getDetail
    } = this.props
    if (!isEmpty(location)) {
      getDistance()
    }
    if (placeId) {
      getDetail()
    }
  }

  copyAddress (text) {
    this.windowCopy(text)
    this.setState({ copied: true })
  }

  windowCopy (text) {
    let textArea
    const isOS = () => {
        return navigator.userAgent.match(/ipad|iphone/i);
    }
    const createTextArea = (text) => {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }
    const selectText = () => {
        let range
        let selection
        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }
    const copyToClipboard = () => {        
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
    createTextArea(text);
    selectText();
    copyToClipboard();
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
            title="Today's hours">
            {hours.map((h) => <span key={h}>{h}</span>)}
          </div>}
          <div className='stats'>
            {rating && <div title='Rating'>
              <span>{rating} &#9733; {totalRatings} review{totalRatings > 1 ? 's' : ''}</span>
            </div>}
            {priceLevel && <div className='price' title='Price Level'>{concat(priceLevel, '$')}</div>}
          </div>
          <div>
            {address && <button className='small'
              title='Copy place address'
              onClick={() => this.copyAddress(address)}>
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
