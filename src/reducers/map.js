import {
  MAP_MOVE,
  GENRE_OVERLAYS_REQUEST,
  GENRE_OVERLAYS_SUCCESS,
  GENRE_OVERLAYS_FAILURE
} from '../constants'

const initialState = {
  overlays: [],
  center: null
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

  if (action.type === MAP_MOVE) {
    return Object.assign({}, state, {
      center: action.mapCenter
    })
  }

  return state
}