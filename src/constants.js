export const ENV = process.env.NODE_ENV

export const POSTER_LINK = 'http://www.zazzle.com/mapofmetal?rf=238327027484104866'

export const MAP_TILE_SOURCE = '/tiles/map.xml'

export const PLAYER_READY           = 'PLAYER_READY'
export const PLAYER_API_READY       = 'PLAYER_API_READY'
export const PLAYER_PLAY            = 'PLAYER_PLAY'
export const PLAYER_PAUSE           = 'PLAYER_PAUSE'
export const PLAYER_STOP            = 'PLAYER_STOP'
export const PLAYER_SEEK            = 'PLAYER_SEEK'
export const PLAYER_LOAD            = 'PLAYER_LOAD'
export const PLAYER_VOLUME          = 'PLAYER_VOLUME'
export const PLAYER_ERROR           = 'PLAYER_ERROR'
export const PLAYER_STATE_CHANGE    = 'PLAYER_STATE_CHANGE'
export const PLAYER_TIME_CHANGE     = 'PLAYER_TIME_CHANGE'
export const PLAYER_DURATION_CHANGE = 'PLAYER_DURATION_CHANGE'
export const PLAYER_QUALITY_CHANGE  = 'PLAYER_QUALITY_CHANGE'

export const PLAYER_STATE_UNSTARTED = -1
export const PLAYER_STATE_ENDED     = 0
export const PLAYER_STATE_PLAYING   = 1
export const PLAYER_STATE_PAUSED    = 2
export const PLAYER_STATE_BUFFERING = 3
export const PLAYER_STATE_CUED      = 5

export const PLAYER_QUALITY = new Map([
  ['default', 'default'],
  ['small',   'small'],
  ['medium',  'medium'],
  ['large',   'large'],
  ['xlarge',  'hd720']
])

export const TRACKLIST_SKIP             = 'TRACKLIST_SKIP'
export const TRACKLIST_NEXT             = 'TRACKLIST_NEXT'
export const TRACKLIST_EXHAUSTED        = 'TRACKLIST_EXHAUSTED'
export const TRACKLIST_NEXT_VIDEO       = 'TRACKLIST_NEXT_VIDEO'
export const TRACKLIST_VIDEOS_EXHAUSTED = 'TRACKLIST_VIDEO_EXHAUSTED'

export const GENRE_SELECTED         = 'GENRE_SELECTED'
export const GENRE_INFO_REQUEST     = 'GENRE_INFO_REQUEST'
export const GENRE_INFO_SUCCESS     = 'GENRE_INFO_SUCCESS'
export const GENRE_INFO_FAILURE     = 'GENRE_INFO_FAILURE'
export const GENRE_OVERLAYS_REQUEST = 'GENRE_OVERLAYS_REQUEST'
export const GENRE_OVERLAYS_SUCCESS = 'GENRE_OVERLAYS_SUCCESS'
export const GENRE_OVERLAYS_FAILURE = 'GENRE_OVERLAYS_FAILURE'

export const MAP_MOVE       = 'MAP_MOVE'
export const MAP_DRAG_START = 'MAP_DRAG_START'
export const MAP_DRAG_END   = 'MAP_DRAG_END'