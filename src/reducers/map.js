import {
  MAP_MOVE,
  MAP_DRAG_START,
  MAP_DRAG_END,
  GENRE_OVERLAYS_REQUEST,
  GENRE_OVERLAYS_SUCCESS,
  GENRE_OVERLAYS_FAILURE
} from '../constants'

const initialState = {
  overlays: [],
  center:   null,
  dragging: false
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

  if (action.type === MAP_DRAG_START) {
    return Object.assign({}, state, {
      dragging: true
    })
  }

  if (action.type === MAP_DRAG_END) {
    return Object.assign({}, state, {
      dragging: false
    })
  }

  return state
}