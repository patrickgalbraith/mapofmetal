import { combineReducers } from 'redux'
import app from './app'
import map from './map'
import genres from './genres'
import player from './player'

const rootReducer = combineReducers({
  app,
  map,
  genres,
  player
})

export default rootReducer