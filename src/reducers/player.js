import {
  PLAYER_PLAY, PLAYER_PAUSE, PLAYER_STOP,
  PLAYER_SEEK, PLAYER_LOAD, PLAYER_VOLUME,
  PLAYER_READY, PLAYER_API_READY,
  PLAYER_STATE_CHANGE, PLAYER_QUALITY,
  PLAYER_TIME_CHANGE,

  PLAYER_STATE_UNSTARTED,
} from '../constants'

const initialState = {
  apiReady:    false,
  playerReady: false,
  state:       PLAYER_STATE_UNSTARTED,
  volume:      50,
  videoId:     null,
  currentTime: 0,
  quality:     PLAYER_QUALITY.default
}

export default function player(state = initialState, action) {
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

  if (action.type === PLAYER_VOLUME) {
    return Object.assign({}, state, {
      volume: action.volume
    })
  }

  if (action.type === PLAYER_QUALITY) {
    return Object.assign({}, state, {
      quality: action.newPlayerState
    })
  }

  if (action.type === PLAYER_STATE_CHANGE) {
    return Object.assign({}, state, {
      state: action.playerState
    })
  }

  if (action.type === PLAYER_TIME_CHANGE) {
    return Object.assign({}, state, {
      currentTime: action.elapsedSeconds
    })
  }

  return state
}