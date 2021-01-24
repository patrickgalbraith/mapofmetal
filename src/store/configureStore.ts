import { compose, createStore, applyMiddleware } from "redux"
import rootReducer, { RootState } from "../reducers"
import thunkMiddleware from "redux-thunk"
import playerMiddleware from "../middleware/player"

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore(initialState: RootState | {}) {
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(thunkMiddleware, playerMiddleware)
  ))

  return store
}