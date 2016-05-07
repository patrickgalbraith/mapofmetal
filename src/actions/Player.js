import {
  PLAYER_PLAY, PLAYER_PAUSE, PLAYER_STOP,
  PLAYER_SEEK, PLAYER_LOAD, PLAYER_VOLUME,
  PLAYER_READY
} from '../constants'

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