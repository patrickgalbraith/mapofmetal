import { MAP_MOVE, MAP_DRAG_START, MAP_DRAG_END } from '../constants'

export function changeMapCenter(mapCenter) {
  return {
    type: MAP_MOVE,
    mapCenter
  }
}

export function dragStart() {
  return {
    type: MAP_DRAG_START
  }
}

export function dragEnd() {
  return {
    type: MAP_DRAG_END
  }
}