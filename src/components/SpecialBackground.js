import React, { Component } from 'react'
import Util from '../util'
import Constants from '../util/Constants'
import Heart from '../images/holiday/icon-heart.svg'

class DayBackground extends Component {
  constructor (props) {
    super(props)
    this.state = {
      holiday: ''
    }
  }

  componentDidMount () {
    const { HOLIDAYS } = Constants
    const holiday = Util.getTodayHoliday(new Date())
    switch (holiday) {
      case HOLIDAYS.VALENTINES:
        this.setState({
          holiday: holiday,
          icon: Heart
        })
        break
      default:
        break
    }
  }

  render () {
    const { holiday, icon } = this.state
    const { isNightMode } = this.props
    const background = []
    for (let i = 0; i < 6; i++) {
      background.push(<div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '24px',
        width: '20px'
      }}>
        <div
          className='slideInDown'
          style={{
            width: '1px',
            height: '12px',
            background: isNightMode ? '#fff' : '#aaa',
            position: 'absolute',
            top: '0px'
          }} />
        <img src={icon}
          className='swing'
          style={{
            position: 'absolute',
            top: '4px',
            zIndex: '5'
          }}
          width={20}
          alt={holiday}
        />
      </div>)
    }
    return (<div className='App-special-background fadeIn'>
      {holiday && background}
    </div>)
  }
}

export default DayBackground
