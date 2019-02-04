import _ from 'lodash'
import { getSunrise, getSunset } from 'sunrise-sunset-js'
import Holidays from 'date-holidays'

const Util = {
  isNight: (date, longitude, latitude) => {
    const sunrise = getSunrise(latitude, longitude, date)
    const sunriseDiff = sunrise - date
    const sunset = getSunset(latitude, longitude, date)
    const sunsetDiff = sunset - date
    return sunriseDiff <= sunsetDiff
  },
  getTodayHoliday: (date) => {
    const hd = new Holidays('US')
    const isHoliday = hd.isHoliday(date)
    return _.get(isHoliday, 'name', '')
  },
  getOpenHours: (date, data) => {
    const day = date.getDay()
    const weekdayHours = _.get(data, 'opening_hours.weekday_text', [])
    let hours = ''
    try {
      hours = weekdayHours[_.isEqual(day, 0) ? weekdayHours.length - 1 : day - 1]
      hours = _.split(hours, ': ')[1]
    } catch (e) {
      console.log(e)
    }
    return hours
  }
}

export default Util
