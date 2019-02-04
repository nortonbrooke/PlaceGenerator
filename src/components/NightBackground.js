import React, { Component } from 'react'
import shortid from 'shortid'

class NightBackground extends Component {
  constructor (props) {
    super(props)
    this.state = {
      placeDistance: null,
      placeDetail: null,
      placeDetailAttributions: []
    }
  }

  componentDidMount () {

  }

  render () {
    return (<div className='App-night-background'>
      <div className='stars' key={shortid.generate()} />
      <div className='twinkling' key={shortid.generate()} />
    </div>)
  }
}

export default NightBackground
