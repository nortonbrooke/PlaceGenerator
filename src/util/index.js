import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import split from 'lodash/split'
import SunCalc from 'suncalc'

export const getNight = (latitude, longitude) => {
  const date = new Date()
  const times = SunCalc.getTimes(date, latitude, longitude)
  const sunset = get(times, 'sunset')
  const sunrise = get(times, 'sunrise')
  return date >= sunset || date <= sunrise
}

export const getOpenHours = (date, data) => {
  if (!data) {
    return []
  }
  const day = date.getDay()
  const weekdayHours = get(data, 'opening_hours.weekday_text', [])
  let hours = []
  try {
    hours = weekdayHours[isEqual(day, 0) ? weekdayHours.length - 1 : day - 1]
    hours = split(hours, ': ')[1]
    hours = split(hours, ',')
  } catch (e) {
    console.log(e)
  }
  return hours
}

export const concat = (value, unit) => {
  let text = ''
  for (let i = 0; i < value; i++) {
    text += unit
  }
  return text
}