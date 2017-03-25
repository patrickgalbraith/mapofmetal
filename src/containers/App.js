import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import MapPage from './MapPage'
import LoadingSplash from '../components/LoadingSplash'
import FatalErrorScreen from '../components/FatalErrorScreen'

import { fetchGenreInfo, fetchGenreOverlays } from '../actions/Genre'

class App extends Component {
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
              ? <LoadingSplash key='LoadingPage'
                               loading={loading}
                               onEnter={() => this.setState({entered: true})} />
              : (
                <MapPage key='MainPage' />
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

const mapStateToProps = (state, ownProps) => {
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