import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import noop from 'lodash/noop'
import { concat } from '../../util'
import './Place.css'

class Place extends Component {
  constructor(props) {
    super(props)
    this.state = {
      copied: false
    }
  }

  componentDidMount() {
    const {
      location,
      distance,
      placeId,
      getDistance,
      detail,
      getDetail
    } = this.props
    if (!isEmpty(location) && !distance) {
      getDistance()
    }
    if (placeId && !detail) {
      getDetail()
    }
  }

  copyAddress(event, text) {
    event.stopPropagation()
    this.windowCopy(text)
    this.setState({ copied: true })
  }

  windowCopy(text) {
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

  openTab(event, url) {
    event.stopPropagation()
    window.open(url, '_newtab')
  }

  render() {
    const {
      color,
      name,
      distance,
      detail,
      hours,
      attributions
    } = this.props
    const { copied } = this.state
    const distanceLoaded = distance !== undefined;
    const detailLoaded = detail !== undefined;
    return (<div className='App-place flipInY' style={{ borderColor: color }}>
      {distance && detailLoaded && <div className='distance flipInX'
        title='Place distance'
        style={{ color: color }}>
        {distance}
      </div>}
      {distanceLoaded && detailLoaded && <div className='name flipInX'
        title={name}>
        {name}
      </div>}
      {detail && distanceLoaded && <div className='detail flipInX'>
        {hours && <div className='hours'
          title="Today's hours">
          {hours.map((h) => <span key={h}>{h}</span>)}
        </div>}
        <div className='stats'>
          {detail.rating && <div title='Rating'>
            <span>{detail.rating} &#9733; {detail.user_ratings_total ? `(${detail.user_ratings_total})` : ''}</span>
          </div>}
          {detail.rating && detail.price_level && <span> · </span>}
          {detail.price_level && <div className='price' title='Price Level'>{concat(detail.price_level, '$')}</div>}
        </div>
        <div>
          {detail.formatted_address && <button className='small'
            title='Copy place address'
            onClick={(e) => this.copyAddress(e, detail.formatted_address)}>
            {copied ? 'Copied' : 'Copy Address'}
          </button>}
          {detail.url && <button className='small'
            title='Open place in Google'
            onClick={(e) => this.openTab(e, detail.url)}>
            Open in Google
            </button>}
        </div>
        {attributions && <div className='attributions'
          title='Place attributions'>
          {attributions.map((a) => a)}
        </div>}
      </div>}
    </div>)
  }
}

Place.defaultProps = {
  getDistance: noop,
  getDetail: noop
}

export default Place
