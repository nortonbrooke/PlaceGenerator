import React from 'react'
import ReactDOM from 'react-dom'
import PlaceDetail from './PlaceDetail'
import Util from '../../util'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<PlaceDetail />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('gets monday open hours', () => {
  const data = {
    opening_hours: {
      weekday_text: [
        'Monday: 9:00 AM – 5:00 PM',
        '',
        '',
        '',
        '',
        '',
        'Sunday: 10:00 AM – 5:00 PM'
      ]
    }
  }
  const Monday = new Date('Mon Feb 04 2019')
  expect(Util.getOpenHours(Monday, data)).toEqual('9:00 AM – 5:00 PM')
})

it('gets sunday open hours', () => {
  const data = {
    opening_hours: {
      weekday_text: [
        'Monday: 9:00 AM – 5:00 PM',
        '',
        '',
        '',
        '',
        '',
        'Sunday: 10:00 AM – 5:00 PM'
      ]
    }
  }
  const Sunday = new Date('Sun Feb 10 2019')
  expect(Util.getOpenHours(Sunday, data)).toEqual('10:00 AM – 5:00 PM')
})