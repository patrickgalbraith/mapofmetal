
import { GenreOverlay, MapCenterPoint } from "../types";
import { MAP_MOVE, MAP_DRAG_START, MAP_DRAG_END, GENRE_OVERLAYS_REQUEST, GENRE_OVERLAYS_SUCCESS, GENRE_OVERLAYS_FAILURE } from "../constants";

export type State = {
  overlays: GenreOverlay[];
  center: MapCenterPoint | null;
  dragging: boolean;
};

const initialState: State = {
  overlays: [],
  center: null,
  dragging: false
};

export default function map(state: State = initialState, action: any): State {
  if (action.type === GENRE_OVERLAYS_SUCCESS) {
    return Object.assign({}, state, {
      overlays: action.genreOverlays
    });
  }

  if (action.type === MAP_MOVE) {
    return Object.assign({}, state, {
      center: action.mapCenter
    });
  }

  if (action.type === MAP_DRAG_START) {
    return Object.assign({}, state, {
      dragging: true
    });
  }

  if (action.type === MAP_DRAG_END) {
    return Object.assign({}, state, {
      dragging: false
    });
  }

  return state;
}