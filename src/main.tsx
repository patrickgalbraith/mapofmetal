import "babel-polyfill"
import "whatwg-fetch"

import React from "react"
import ReactDom from "react-dom"
import { Provider } from "react-redux"
import configureStore from "./store/configureStore"
import App from "./containers/App"

if (module.hot) {
  module.hot.accept()
}

const initialState = {}

// Add css class for environment to enable development styles
if (document.body && process.env.NODE_ENV) {
  document.body.classList.add(`env-${process.env.NODE_ENV}`)
}

const store = configureStore(initialState)

ReactDom.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById('react-root')
)