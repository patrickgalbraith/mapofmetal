import { AnyAction } from "redux"
import { GenreInfo } from "../types"
import { GENRE_INFO_SUCCESS, TRACKLIST_VIDEOS_EXHAUSTED } from "../constants"

export type State = GenreInfo[]

const initialState: State = []

export default function genres(state: State = initialState, action: AnyAction): State {
  if (action.type === GENRE_INFO_SUCCESS) {
    return action.genreInfo
  }

  // Label tracks that fail to load
  if (action.type === TRACKLIST_VIDEOS_EXHAUSTED) {
    return state.map(genre => {
      if (genre.id === action.genre) {
        return {
          ...genre,
          tracklist: genre.tracklist.map((track, idx) => {
            if (idx != action.trackNo)
              return track

            return {
              ...track,
              _failed: true
            }
          })
        }
      }

      return genre
    })
  }

  return state
}