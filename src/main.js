// @flow
import type { State } from './reducers'

import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import rootReducer from './reducers'
import App from './containers/App'
import DevTools from './containers/DevTools'

import { ENV } from './constants'

if (ENV === 'development')
  require('./styles')

const initialState: ?State = null

// Add css class for environment to enable development styles
if (document.body && process.env.NODE_ENV) {
  document.body.classList.add(`env-${process.env.NODE_ENV}`)
}

const store = configureStore(initialState)

render(
  <Provider store={store}>
    <div>
      <App />
      { ENV === 'development' ? <DevTools /> : null }
    </div>
  </Provider>,
  document.getElementById('react-root')
)