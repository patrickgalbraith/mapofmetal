import { compose, createStore, applyMiddleware } from "redux"
import rootReducer, { RootState } from "../reducers"
import thunkMiddleware from "redux-thunk"
import playerMiddleware from "../middleware/player"

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(initialState: RootState | {}) {
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunkMiddleware, playerMiddleware)
  ))

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    })
  }

  return store
}