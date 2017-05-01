// @flow
import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import thunk from 'redux-thunk'
import player from '../middleware/player'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

declare var module : {
  hot : {
    accept(path:string, callback:() => void): void
  }
}

const enhancer = compose(
  applyMiddleware(thunk, player),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
)

export default function configureStore(initialState: any) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  return store
}