import { Action } from "redux"
import {
  PLAYER_PLAY, PLAYER_PAUSE, PLAYER_STOP,
  PLAYER_SEEK, PLAYER_LOAD, PLAYER_VOLUME,
  PLAYER_READY, PLAYER_API_READY, PLAYER_STATE_CHANGE,
  PLAYER_ERROR, PLAYER_TIME_CHANGE, PLAYER_DURATION_CHANGE,
  PLAYER_QUALITY_CHANGE } from "../constants"

export function apiReady(): Action<string> {
  return {
    type: PLAYER_API_READY
  }
}

export function ready(videoId: string, volume: number): Action<string> & {
  videoId: string
  volume: number
} {
  return {
    type: PLAYER_READY,
    videoId,
    volume
  }
}

export function play(): Action<string> {
  return {
    type: PLAYER_PLAY
  }
}

export function pause(): Action<string> {
  return {
    type: PLAYER_PAUSE
  }
}

export function stop(): Action<string> {
  return {
    type: PLAYER_STOP
  }
}

export function seek(seconds: number): Action<string> & {
  seconds: number
} {
  return {
    type: PLAYER_SEEK,
    seconds
  }
}

export function load(videoId: string): Action<string> & {
  videoId: string
} {
  return {
    type: PLAYER_LOAD,
    videoId
  }
}

export function volume(volume: number): Action<string> & {
  volume: number
} {
  return {
    type: PLAYER_VOLUME,
    volume: Math.max(0, Math.min(100, volume))
  }
}

export function error(errorCode: number): Action<string> & {
  errorCode: number
} {
  return {
    type: PLAYER_ERROR,
    errorCode
  }
}

export function stateChange(playerState: number): Action<string> & {
  playerState: number
} {
  return {
    type: PLAYER_STATE_CHANGE,
    playerState
  }
}

export function timeChange(elapsedSeconds: number): Action<string> & {
  elapsedSeconds: number
} {
  return {
    type: PLAYER_TIME_CHANGE,
    elapsedSeconds
  }
}

export function durationChange(duration: number): Action<string> & {
  duration: number
} {
  return {
    type: PLAYER_DURATION_CHANGE,
    duration
  }
}

export function qualityChange(quality: string): Action<string> & {
  quality: string
} {
  return {
    type: PLAYER_QUALITY_CHANGE,
    quality
  }
}