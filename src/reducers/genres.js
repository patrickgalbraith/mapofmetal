import {
  GENRE_INFO_REQUEST,
  GENRE_INFO_SUCCESS,
  GENRE_INFO_FAILURE
} from '../constants'

const initialState = []

export default function genres(state = initialState, action) {
  if (action.type === GENRE_INFO_SUCCESS) {
    return action.genreInfo
  }

  if (action.type === GENRE_INFO_FAILURE) {
    // @todo
  }

  return state
}