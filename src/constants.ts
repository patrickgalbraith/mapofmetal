export const ENV: string = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

export const POSTER_LINK: string = 'http://www.zazzle.com/mapofmetal?rf=238327027484104866'

export const MAP_TILE_SOURCE: string = '/tiles/map.xml'

export const PLAYER_READY: string = 'PLAYER_READY'
export const PLAYER_API_READY: string = 'PLAYER_API_READY'
export const PLAYER_PLAY: string = 'PLAYER_PLAY'
export const PLAYER_PAUSE: string = 'PLAYER_PAUSE'
export const PLAYER_STOP: string = 'PLAYER_STOP'
export const PLAYER_SEEK: string = 'PLAYER_SEEK'
export const PLAYER_LOAD: string = 'PLAYER_LOAD'
export const PLAYER_VOLUME: string = 'PLAYER_VOLUME'
export const PLAYER_ERROR: string = 'PLAYER_ERROR'
export const PLAYER_STATE_CHANGE: string = 'PLAYER_STATE_CHANGE'
export const PLAYER_TIME_CHANGE: string = 'PLAYER_TIME_CHANGE'
export const PLAYER_DURATION_CHANGE: string = 'PLAYER_DURATION_CHANGE'
export const PLAYER_QUALITY_CHANGE: string = 'PLAYER_QUALITY_CHANGE'

export const PLAYER_STATE_UNSTARTED: number = -1
export const PLAYER_STATE_ENDED: number = 0
export const PLAYER_STATE_PLAYING: number = 1
export const PLAYER_STATE_PAUSED: number = 2
export const PLAYER_STATE_BUFFERING: number = 3
export const PLAYER_STATE_CUED: number = 5

export const PLAYER_QUALITY: Map<string, YT.SuggestedVideoQuality> = new Map([
  ['default', 'default'],
  ['small', 'small'],
  ['medium', 'medium'],
  ['large', 'large'],
  ['xlarge', 'hd720']
])

export const TRACKLIST_SKIP: string = 'TRACKLIST_SKIP'
export const TRACKLIST_NEXT: string = 'TRACKLIST_NEXT'
export const TRACKLIST_EXHAUSTED: string = 'TRACKLIST_EXHAUSTED'
export const TRACKLIST_NEXT_VIDEO: string = 'TRACKLIST_NEXT_VIDEO'
export const TRACKLIST_VIDEOS_EXHAUSTED: string = 'TRACKLIST_VIDEO_EXHAUSTED'

export const GENRE_SELECTED: string = 'GENRE_SELECTED'
export const GENRE_INFO_REQUEST: string = 'GENRE_INFO_REQUEST'
export const GENRE_INFO_SUCCESS: string = 'GENRE_INFO_SUCCESS'
export const GENRE_INFO_FAILURE: string = 'GENRE_INFO_FAILURE'
export const GENRE_OVERLAYS_REQUEST: string = 'GENRE_OVERLAYS_REQUEST'
export const GENRE_OVERLAYS_SUCCESS: string = 'GENRE_OVERLAYS_SUCCESS'
export const GENRE_OVERLAYS_FAILURE: string = 'GENRE_OVERLAYS_FAILURE'

export const MAP_MOVE: string = 'MAP_MOVE'
export const MAP_DRAG_START: string = 'MAP_DRAG_START'
export const MAP_DRAG_END: string = 'MAP_DRAG_END'