import { MapCenterPoint } from "../types";
import { MAP_MOVE, MAP_DRAG_START, MAP_DRAG_END } from "../constants";
import { Action } from "redux";

export function changeMapCenter(
  mapCenter: MapCenterPoint
): Action<string> & {
  mapCenter: MapCenterPoint;
} {
  return {
    type: MAP_MOVE,
    mapCenter,
  };
}

export function dragStart(): Action<string> {
  return {
    type: MAP_DRAG_START,
  };
}

export function dragEnd(): Action<string> {
  return {
    type: MAP_DRAG_END,
  };
}
