import {
  PLAYER_PLAY, PLAYER_PAUSE, PLAYER_STOP,
  PLAYER_SEEK, PLAYER_LOAD, PLAYER_VOLUME,
  PLAYER_READY, PLAYER_API_READY,
  PLAYER_STATE_UNSTARTED,
  PLAYER_QUALITY
} from '../constants'

const initialState = {
  apiReady:    false,
  ready:       false,
  state:       PLAYER_STATE_UNSTARTED,
  volume:      50,
  videoId:     null,
  currentTime: 0,
  quality:     PLAYER_QUALITY.default
}

export default function map(state = initialState, action) {


  return state
}