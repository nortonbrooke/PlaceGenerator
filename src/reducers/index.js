import { combineReducers } from 'redux'
import main from './main'
import places from './places'
import place from './place'

export default combineReducers({
  main,
  places,
  place
})
