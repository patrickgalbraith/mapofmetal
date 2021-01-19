
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import player from "../middleware/player";

const enhancer = applyMiddleware(thunk, player);

export default function configureStore(initialState: any) {
  return createStore(rootReducer, initialState, enhancer);
}