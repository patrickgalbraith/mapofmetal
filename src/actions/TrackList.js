import {
  TRACKLIST_SKIP,
  TRACKLIST_NEXT
} from '../constants'

const isNextTrackValid = (state, genre, trackNo) => {
  const genreInfo = state.genres.find((g) => g.id === genre)
  return genreInfo.tracklist.length > trackNo
}

export const nextTrack = () => (dispatch, getState) => {
  const state       = getState()
  const nowPlaying  = state.app.nowPlaying
  const nextTrackNo = nowPlaying.trackNo + 1

  if (!isNextTrackValid(state, nowPlaying.genre, nextTrackNo))
    return null

  dispatch({
    type: TRACKLIST_NEXT
  })
}

export const skipToTrack = (genre, trackNo) => (dispatch, getState) => {
  if (!isNextTrackValid(getState(), genre, trackNo))
    return null

  dispatch({
    type: TRACKLIST_SKIP,
    genre,
    trackNo
  })
}