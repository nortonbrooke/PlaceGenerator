import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import AppFunc from './AppFunc'
import Util from './util'
import Constants from './util/Constants'
import Categories from './util/categories'
import initialState from './App'

const { EVENTS } = Constants

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('gets nearby places when location changes', () => {
  const prev = {
    ...initialState,
    location: []
  }
  const curr = {
    ...initialState,
    location: [28.5383, -81.3792]
  }
  expect(AppFunc(prev, curr)).toEqual(EVENTS.GET_NEARBY_PLACES)
})

it('gets nearby places when category changes', () => {
  const prev = {
    ...initialState,
    category: Categories.food
  }
  const curr = {
    ...initialState,
    category: Categories.entertainment
  }
  expect(AppFunc(prev, curr)).toEqual(EVENTS.GET_NEARBY_PLACES)
})

it('gets nearby places when type changes', () => {
  const prev = {
    ...initialState,
    type: Categories.food.defaultType
  }
  const curr = {
    ...initialState,
    type: 'bar'
  }
  expect(AppFunc(prev, curr)).toEqual(EVENTS.GET_NEARBY_PLACES)
})

it('gets nearby places when custom radius is toggled', () => {
  const prev = {
    ...initialState,
    customRadiusEnabled: false
  }
  const curr = {
    ...initialState,
    customRadiusEnabled: true
  }
  expect(AppFunc(prev, curr)).toEqual(EVENTS.GET_NEARBY_PLACES)
})

it('gets nearby places when custom radius is changed', () => {
  const prev = {
    ...initialState,
    customRadiusEnabled: true,
    customRadius: 5
  }
  const curr = {
    ...initialState,
    customRadiusEnabled: true,
    customRadius: 10
  }
  expect(AppFunc(prev, curr)).toEqual(EVENTS.GET_NEARBY_PLACES)
})

it('gets a random place', () => {
  const prev = {
    ...initialState,
    randomPlaceIndex: -1
  }
  const curr = {
    ...initialState,
    randomPlaceIndex: 6
  }
  expect(AppFunc(prev, curr)).toEqual(EVENTS.GET_RANDOM_PLACE)
})

it('gets the next place', () => {
  const nearbyPlaces = [{
    name: 'Restaurant A'
  },
  {
    name: 'Restaurant B'
  }]
  const prev = {
    ...initialState,
    placeIndex: 0,
    nearbyPlaces
  }
  const curr = {
    ...initialState,
    placeIndex: 1,
    nearbyPlaces
  }
  expect(AppFunc(prev, curr)).toEqual(EVENTS.GET_NEXT_PLACE)
})

it('gets the previous place', () => {
  const nearbyPlaces = [{
    name: 'Restaurant A'
  },
  {
    name: 'Restaurant B'
  }]
  const prev = {
    ...initialState,
    placeIndex: 1,
    nearbyPlaces
  }
  const curr = {
    ...initialState,
    placeIndex: 0,
    nearbyPlaces
  }
  expect(AppFunc(prev, curr)).toEqual(EVENTS.GET_PREVIOUS_PLACE)
})

it('resets places', () => {
  const prev = {
    ...initialState,
    reset: false
  }
  const curr = {
    ...initialState,
    reset: true
  }
  expect(AppFunc(prev, curr)).toEqual(EVENTS.RESET_PLACES)
})

it('determines night time at 7:00 AM', () => {
  const date = new Date('2/4/19 7:00 AM')
  const latitude = 28.5383
  const longitude = -81.3792
  expect(Util.isNight(date, latitude, longitude)).toEqual(false)
})


it('determines night time at 7:00 PM', () => {
  const date = new Date('2/4/19 7:00 PM')
  const latitude = 28.5383
  const longitude = 81.3792
  expect(Util.isNight(date, latitude, longitude)).toEqual(false)
})

it('determines valentines day', () => {
  const date = new Date('2/14/19')
  expect(Util.getTodayHoliday(date)).toEqual("Valentine's Day")
})


it('determines non-holiday', () => {
  const date = new Date('2/13/19')
  expect(Util.getTodayHoliday(date)).toEqual('')
})