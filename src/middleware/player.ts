import { Action } from "redux"
import { ThunkMiddleware } from "redux-thunk"
import { PLAYER_ERROR, TRACKLIST_VIDEOS_EXHAUSTED } from "../constants"
import { nextTrack, nextVideo } from "../actions/TrackList"
import { RootState } from "../reducers"

const middleware: ThunkMiddleware<RootState, Action<string>> = store => next => action => {
  // On playback error skip to next video available
  if (action.type === PLAYER_ERROR) {
    store.dispatch(nextVideo())
  }

  // If there are no videos available next track will be loaded
  if (action.type === TRACKLIST_VIDEOS_EXHAUSTED) {
    store.dispatch(nextTrack())
  }

  return next(action)
}

export default middleware