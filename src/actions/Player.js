import {
  PLAYER_PLAY, PLAYER_PAUSE, PLAYER_STOP,
  PLAYER_SEEK, PLAYER_LOAD, PLAYER_VOLUME,
  PLAYER_READY, PLAYER_API_READY,
  PLAYER_STATE_CHANGE, PLAYER_ERROR,
  PLAYER_TIME_CHANGE, PLAYER_DURATION_CHANGE,
  PLAYER_QUALITY_CHANGE
} from '../constants'

export function apiReady() {
  return {
    type: PLAYER_API_READY
  }
}

export function ready(videoId, volume) {
  return {
    type: PLAYER_READY,
    videoId,
    volume
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

export function load(videoId) {
  return {
    type: PLAYER_LOAD,
    videoId
  }
}

export function volume(volume) {
  return {
    type: PLAYER_VOLUME,
    volume: Math.max(0, Math.min(100, volume))
  }
}

export function error(errorCode) {
  return {
    type: PLAYER_ERROR,
    errorCode
  }
}

export function stateChange(playerState) {
  return {
    type: PLAYER_STATE_CHANGE,
    playerState
  }
}

export function timeChange(elapsedSeconds) {
  return {
    type: PLAYER_TIME_CHANGE,
    elapsedSeconds
  }
}

export function durationChange(duration) {
  return {
    type: PLAYER_DURATION_CHANGE,
    duration
  }
}

export function qualityChange(quality) {
  return {
    type: PLAYER_QUALITY_CHANGE,
    quality
  }
}