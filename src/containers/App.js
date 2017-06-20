// @flow
import type { State } from '../reducers'
import type { ThunkedDispatch as Dispatch } from '../types'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import MapPage from './MapPage'
import LoadingSplash from '../components/LoadingSplash'
import FatalErrorScreen from '../components/FatalErrorScreen'

import { fetchGenreInfo, fetchGenreOverlays } from '../actions/Genre'

class App extends Component {
  state: {
    entered: boolean,
    fatalRenderError: boolean
  }

  props: {
    fatalError: boolean,
    loading: boolean,
    fetchGenreInfo: Dispatch,
    fetchGenreOverlays: Dispatch
  }

  constructor() {
    super()

    this.state = {
      entered: false,
      fatalRenderError: false
    }
  }

  componentDidMount() {
    const { fetchGenreInfo, fetchGenreOverlays } = this.props
    fetchGenreInfo()
    fetchGenreOverlays()
  }

  render() {
    const { entered, fatalRenderError } = this.state
    const { loading, fatalError } = this.props

    return (
      <div className='App'>
        { fatalError || fatalRenderError ?
          <FatalErrorScreen />
          :
          <ReactCSSTransitionGroup
            transitionName="transition"
            transitionEnterTimeout={3000}
            transitionLeaveTimeout={3000}>
            {
              !entered
              ? (
                <div key='LoadingPage' className='Page'>
                  <LoadingSplash loading={loading}
                                 onEnter={() => this.setState({entered: true})} />
                </div>
              ) : (
                <div key='MainPage' className='Page'>
                  <MapPage />
                </div>
              )
            }
          </ReactCSSTransitionGroup>
        }
      </div>
    )
  }

  unstable_handleError(...args) {
    console.error(...args)
    this.setState({ fatalRenderError: true });
  }
}

const mapStateToProps = (state: State) => {
  if (state == null) {
    return {}
  }

  return {
    fatalError: state.app.fatalError,
    loading:    state.genres.length <= 0 || state.map.overlays.length <= 0
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenreInfo:     () => dispatch(fetchGenreInfo()),
    fetchGenreOverlays: () => dispatch(fetchGenreOverlays())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)