import { GENRE_SELECTED, TRACKLIST_SKIP, TRACKLIST_NEXT } from '../constants'

const initialState = {
  selectedGenre: 'heavymetal',
  nowPlaying: {
    genre:   'heavymetal',
    trackNo: 0
  }
}

export default function app(state = initialState, action) {
  if (
    action.type === GENRE_SELECTED &&
    action.newGenre !== state.selectedGenre
  ) {
    return Object.assign({}, state, {
      selectedGenre: action.newGenre
    })
  }

  if (action.type === TRACKLIST_SKIP) {
    return Object.assign({}, state, {
      nowPlaying: {
        genre:   action.genre || state.nowPlaying.genre,
        trackNo: action.trackNo || 0
      }
    })
  }

  if (action.type === TRACKLIST_NEXT) {
    return Object.assign({}, state, {
      nowPlaying: Object.assign({}, state.nowPlaying, {
        trackNo: state.nowPlaying.trackNo + 1
      })
    })
  }

  return state
}