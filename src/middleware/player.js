// @flow
import type { Middleware } from 'redux'

import {
  PLAYER_ERROR,
  TRACKLIST_VIDEOS_EXHAUSTED
} from '../constants'

import { nextTrack, nextVideo } from '../actions/TrackList'

const middleware: Middleware = store => next => action => {
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