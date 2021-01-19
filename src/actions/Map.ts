
import { Action, MapCenterPoint } from "../types";
import { MAP_MOVE, MAP_DRAG_START, MAP_DRAG_END } from "../constants";

export function changeMapCenter(mapCenter: MapCenterPoint): {
  type: string;
  mapCenter: MapCenterPoint;
} {
  return {
    type: MAP_MOVE,
    mapCenter
  };
}

export function dragStart(): Action {
  return {
    type: MAP_DRAG_START
  };
}

export function dragEnd(): Action {
  return {
    type: MAP_DRAG_END
  };
}