import { MAP_MOVE } from '../constants'

export function changeMapCenter(mapCenter) {
  return {
    type: MAP_MOVE,
    mapCenter
  }
}