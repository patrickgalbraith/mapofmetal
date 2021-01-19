import { State as AppState } from "./app"
import { State as MapState } from "./map"
import { State as GenresState } from "./genres"
import { State as PlayerState } from "./player"

import { combineReducers } from "redux"
import app from "./app"
import map from "./map"
import genres from "./genres"
import player from "./player"

export type State = {
  app: AppState
  map: MapState
  genres: GenresState
  player: PlayerState
}

const rootReducer = combineReducers({
  app,
  map,
  genres,
  player
})

export default rootReducer