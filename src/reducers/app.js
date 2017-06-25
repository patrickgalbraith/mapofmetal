// @flow
import {
  GENRE_SELECTED,
  GENRE_INFO_FAILURE,
  GENRE_OVERLAYS_FAILURE,
  TRACKLIST_SKIP,
  TRACKLIST_NEXT,
  TRACKLIST_NEXT_VIDEO
} from '../constants'

export type State = {
  selectedGenre: string,
  nowPlaying: {
    genre:   string,
    trackNo: number,
    videoNo: number
  },
  fatalError: boolean
}

const initialState: State = {
  selectedGenre: 'heavymetal',
  nowPlaying: {
    genre:   'heavymetal',
    trackNo: 0,
    videoNo: 0 // Increments on playback error
  },
  fatalError: false
}

export default function app(state: State = initialState, action: any): State {
  if (
    action.type === GENRE_SELECTED &&
    action.newGenre !== state.selectedGenre
  ) {
    return Object.assign({}, state, {
      selectedGenre: action.newGenre
    })
  }

  if (
    action.type === GENRE_INFO_FAILURE ||
    action.type === GENRE_OVERLAYS_FAILURE
  ) {
    return Object.assign({}, state, {
      fatalError: true
    })
  }

  if (action.type === TRACKLIST_SKIP) {
    return Object.assign({}, state, {
      nowPlaying: {
        genre:   action.genre || state.nowPlaying.genre,
        trackNo: action.trackNo || 0,
        videoNo: 0
      }
    })
  }

  if (action.type === TRACKLIST_NEXT) {
    return Object.assign({}, state, {
      nowPlaying: Object.assign({}, state.nowPlaying, {
        trackNo: state.nowPlaying.trackNo + 1,
        videoNo: 0
      })
    })
  }

  if (action.type === TRACKLIST_NEXT_VIDEO) {
    return Object.assign({}, state, {
      nowPlaying: Object.assign({}, state.nowPlaying, {
        videoNo: state.nowPlaying.videoNo + 1
      })
    })
  }

  return state
}