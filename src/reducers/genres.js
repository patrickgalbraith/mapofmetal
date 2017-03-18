import {
  GENRE_INFO_REQUEST,
  GENRE_INFO_SUCCESS,
  TRACKLIST_VIDEOS_EXHAUSTED
} from '../constants'

const initialState = []

export default function genres(state = initialState, action) {
  if (action.type === GENRE_INFO_SUCCESS) {
    return action.genreInfo
  }

  // Label tracks that fail to load
  if (action.type === TRACKLIST_VIDEOS_EXHAUSTED) {
    return state.map((genre) => {
      if (genre.id === action.genre) {
        return Object.assign({}, genre, {
          tracklist: genre.tracklist.map((track) => {
            if (idx != action.trackNo)
              return track

            return Object.assign({}, track, {
              _failed: true
            })
          })
        })
      }

      return genre
    })
  }

  return state
}