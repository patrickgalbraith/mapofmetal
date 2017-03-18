import {
  TRACKLIST_SKIP,
  TRACKLIST_NEXT,
  TRACKLIST_NEXT_VIDEO,
  TRACKLIST_EXHAUSTED,
  TRACKLIST_VIDEOS_EXHAUSTED
} from '../constants'

const isNextTrackValid = (genreInfo, trackNo) => (
  trackNo > 0 &&
  genreInfo.tracklist.length > trackNo
)

const isNextVideoValid = (genreInfo, trackNo, videoNo) => {
  const track = genreInfo.tracklist[trackNo]
  return (
    (
      videoNo === 0 ||
      Array.isArray(track.videos)
    ) &&
    track.videos.length > videoNo
  )
}

export const nextTrack = () => (dispatch, getState) => {
  const state       = getState()
  const nowPlaying  = state.app.nowPlaying
  const genreInfo   = state.genres.find((g) => g.id === nowPlaying.genre)

  let valid = isNextTrackValid(genreInfo, nowPlaying.trackNo + 1)

  dispatch({
    type:  valid ? TRACKLIST_NEXT : TRACKLIST_EXHAUSTED,
    genre: genreInfo.id,
  })
}

export const skipToTrack = (genre, trackNo) => (dispatch, getState) => {
  const state     = getState()
  const genreInfo = state.genres.find((g) => g.id === genre)

  if (!isNextTrackValid(genreInfo, trackNo))
    return null

  dispatch({
    type: TRACKLIST_SKIP,
    genre,
    trackNo
  })
}

export const nextVideo = () => (dispatch, getState) => {
  const state      = getState()
  const nowPlaying = state.app.nowPlaying
  const genreInfo  = state.genres.find((g) => g.id === nowPlaying.genre)

  let valid = isNextVideoValid(genreInfo, nowPlaying.trackNo, nowPlaying.videoNo + 1)

  dispatch({
    type:    valid ? TRACKLIST_NEXT_VIDEO : TRACKLIST_VIDEOS_EXHAUSTED,
    genre:   genreInfo.id,
    trackNo: nowPlaying.trackNo
  })
}