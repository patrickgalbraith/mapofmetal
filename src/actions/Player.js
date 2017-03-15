import {
  PLAYER_PLAY, PLAYER_PAUSE, PLAYER_STOP,
  PLAYER_SEEK, PLAYER_LOAD, PLAYER_VOLUME,
  PLAYER_READY, PLAYER_API_READY,
  PLAYER_STATE_CHANGE, PLAYER_ERROR
} from '../constants'

export function apiReady() {
  return {
    type: PLAYER_API_READY
  }
}

export function ready() {
  return {
    type: PLAYER_READY
  }
}

export function play() {
  return {
    type: PLAYER_PLAY
  }
}

export function pause() {
  return {
    type: PLAYER_PAUSE
  }
}

export function stop() {
  return {
    type: PLAYER_STOP
  }
}

export function seek(seconds) {
  return {
    type: PLAYER_SEEK,
    seconds
  }
}

export function load(video) {
  return {
    type: PLAYER_LOAD,
    video
  }
}

export function volume(volume) {
  return {
    type: PLAYER_VOLUME,
    volume
  }
}

export function error(errorCode) {
  return {
    type: PLAYER_ERROR,
    errorCode
  }
}

export function stateChange(newPlayerState) {
  return {
    type: PLAYER_STATE_CHANGE,
    newPlayerState
  }
}