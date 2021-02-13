import { AnyAction } from "redux";
import { GenreOverlay, MapCenterPoint } from "../types";
import {
  MAP_MOVE,
  MAP_DRAG_START,
  MAP_DRAG_END,
  GENRE_OVERLAYS_SUCCESS,
} from "../constants";

export type State = {
  overlays: GenreOverlay[];
  center: MapCenterPoint | null;
  dragging: boolean;
};

const initialState: State = {
  overlays: [],
  center: null,
  dragging: false,
};

export default function map(
  state: State = initialState,
  action: AnyAction
): State {
  if (action.type === GENRE_OVERLAYS_SUCCESS) {
    return {
      ...state,
      overlays: action.genreOverlays,
    };
  }

  if (action.type === MAP_MOVE) {
    return {
      ...state,
      center: action.mapCenter,
    };
  }

  if (action.type === MAP_DRAG_START) {
    return {
      ...state,
      dragging: true,
    };
  }

  if (action.type === MAP_DRAG_END) {
    return {
      ...state,
      dragging: false,
    };
  }

  return state;
}
