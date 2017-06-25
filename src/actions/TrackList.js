// @flow
import type { State } from '../reducers'
import type { Action, GenreInfo, TrackInfo, Dispatch } from '../types'
import {
  TRACKLIST_SKIP,
  TRACKLIST_NEXT,
  TRACKLIST_NEXT_VIDEO,
  TRACKLIST_EXHAUSTED,
  TRACKLIST_VIDEOS_EXHAUSTED
} from '../constants'

const isNextTrackValid = (genreInfo: GenreInfo, trackNo: number): boolean => (
  trackNo >= 0 &&
  genreInfo.tracklist.length > trackNo
)

const isNextVideoValid = (genreInfo: GenreInfo, trackNo: number, videoNo: number): boolean => {
  const track = genreInfo.tracklist[trackNo]
  return (
    (
      videoNo === 0 ||
      Array.isArray(track.videos)
    ) &&
    track.videos.length > videoNo
  )
}

export const nextTrack = () => (dispatch: Dispatch<*, *>, getState: () => State) => {
  const state: State = getState()

  if (state == null)
    return

  const nowPlaying            = state.app.nowPlaying
  const genreInfo: ?GenreInfo = state.genres.find((g) => g.id === nowPlaying.genre)

  let valid = genreInfo != null && isNextTrackValid(genreInfo, nowPlaying.trackNo + 1)

  dispatch({
    type:  valid ? TRACKLIST_NEXT : TRACKLIST_EXHAUSTED,
    genre: genreInfo ? genreInfo.id : null,
  })
}

export const skipToTrack = (genre: string, trackNo: number) => (dispatch: Dispatch<*, *>, getState: () => State) => {
  const state: State = getState()

  if (state == null)
    return null

  const genreInfo: ?GenreInfo = state.genres.find((g) => g.id === genre)

  if (genreInfo == null || !isNextTrackValid(genreInfo, trackNo))
    return null

  dispatch({
    type: TRACKLIST_SKIP,
    genre,
    trackNo
  })
}

export const nextVideo = () => (dispatch: Dispatch<*, *>, getState: () => State) => {
  const state: State = getState()

  if (state == null)
    return

  const nowPlaying            = state.app.nowPlaying
  const genreInfo: ?GenreInfo = state.genres.find((g) => g.id === nowPlaying.genre)

  let valid = genreInfo != null && isNextVideoValid(genreInfo, nowPlaying.trackNo, nowPlaying.videoNo + 1)

  dispatch({
    type:    valid ? TRACKLIST_NEXT_VIDEO : TRACKLIST_VIDEOS_EXHAUSTED,
    genre:   genreInfo ? genreInfo.id : null,
    trackNo: nowPlaying.trackNo
  })
}