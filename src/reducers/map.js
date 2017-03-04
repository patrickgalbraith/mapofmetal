import {
  GENRE_OVERLAYS_REQUEST,
  GENRE_OVERLAYS_SUCCESS,
  GENRE_OVERLAYS_FAILURE
} from '../constants'

const initialState = {
  overlays: []
}

export default function map(state = initialState, action) {
  if (action.type === GENRE_OVERLAYS_SUCCESS) {
    return Object.assign({}, state, {
      overlays: action.genreOverlays
    })
  }

  if (action.type === GENRE_OVERLAYS_FAILURE) {
    // @todo
  }

  return state
}