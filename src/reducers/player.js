// @flow
import {
  PLAYER_PLAY, PLAYER_PAUSE, PLAYER_STOP,
  PLAYER_SEEK, PLAYER_LOAD, PLAYER_VOLUME,
  PLAYER_READY, PLAYER_API_READY,
  PLAYER_STATE_CHANGE, PLAYER_QUALITY,
  PLAYER_TIME_CHANGE, PLAYER_DURATION_CHANGE,
  PLAYER_QUALITY_CHANGE,

  PLAYER_STATE_UNSTARTED, PLAYER_STATE_PLAYING,
  PLAYER_STATE_PAUSED
} from '../constants'

export type State = {
  apiReady:    boolean,
  playerReady: boolean,
  state:       number,
  volume:      ?number,
  videoId:     ?string,
  duration:    number,
  quality:     ?string
}

const initialState: State = {
  apiReady:    false,
  playerReady: false,
  state:       PLAYER_STATE_UNSTARTED,
  volume:      null,
  videoId:     null,
  duration:    0,
  quality:     PLAYER_QUALITY.get('default')
}

export default function player(state: State = initialState, action: any): State {
  if (action.type === PLAYER_API_READY) {
    return Object.assign({}, state, {
      apiReady: true
    })
  }

  if (action.type === PLAYER_READY) {
    return Object.assign({}, state, {
      playerReady: true,
      videoId: action.videoId,
      volume: action.volume
    })
  }

  if (action.type === PLAYER_LOAD) {
    return Object.assign({}, state, {
      videoId: action.videoId
    })
  }

  if (
    action.type === PLAYER_PLAY &&
    state.state === PLAYER_STATE_PAUSED
  ) {
    return Object.assign({}, state, {
      state: PLAYER_STATE_PLAYING
    })
  }

  if (
    action.type === PLAYER_PAUSE &&
    state.state === PLAYER_STATE_PLAYING
  ) {
    return Object.assign({}, state, {
      state: PLAYER_STATE_PAUSED
    })
  }

  if (action.type === PLAYER_VOLUME) {
    return Object.assign({}, state, {
      volume: action.volume
    })
  }

  if (action.type === PLAYER_QUALITY_CHANGE) {
    return Object.assign({}, state, {
      quality: action.quality
    })
  }

  if (action.type === PLAYER_STATE_CHANGE) {
    return Object.assign({}, state, {
      state: action.playerState
    })
  }

  if (action.type === PLAYER_DURATION_CHANGE) {
    return Object.assign({}, state, {
      duration: action.duration
    })
  }

  return state
}