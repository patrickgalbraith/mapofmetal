import { combineReducers } from 'redux'
import app from './app'
import map from './map'
import genres from './genres'

const rootReducer = combineReducers({
  app,
  map,
  genres
})

export default rootReducer