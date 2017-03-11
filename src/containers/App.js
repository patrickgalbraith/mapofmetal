import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import VideoPlayer from '../components/VideoPlayer'
import TopBar from '../components/TopBar'
import PlayerControls from '../components/PlayerControls'
import MapLayer from '../components/MapLayer'
import LoadingSplash from '../components/LoadingSplash'
import GenreInfo from './GenreInfo'

import { MAP_TILE_SOURCE } from '../constants'

import { selectGenre, fetchGenreInfo, fetchGenreOverlays } from '../actions/Genre'

class App extends Component {
  constructor() {
    super()

    this.state = {
      entered: false
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchGenreInfo())
    dispatch(fetchGenreOverlays())
  }

  changeGenre(genreId) {
    const { dispatch } = this.props
    dispatch(selectGenre(genreId))
  }

  render() {
    const { entered } = this.state
    const {
      loading,
      overlays,
      currentGenre,
      currentVideo,
      playerPosition,
      genreInfo
    } = this.props

    return (
      <div className='App'>
        <ReactCSSTransitionGroup
          transitionName="transition"
          transitionEnterTimeout={3000}
          transitionLeaveTimeout={3000}>
          {
            !entered
            ? <LoadingSplash key='loading' loading={loading} onEnter={() => this.setState({entered: true})} />
            : (
              <div key='main' className='AppMain'>
                <TopBar />

                <VideoPlayer current={currentVideo} />

                <GenreInfo current={currentGenre}
                           genres={genreInfo} />

                <PlayerControls position={playerPosition} />

                <MapLayer tileSources={MAP_TILE_SOURCE}
                          overlays={overlays}
                          onOverlayClick={(genreId) => this.changeGenre(genreId)} />
              </div>
            )
          }
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    overlays: state.map.overlays,
    currentGenre: state.selectedGenre,
    loading: state.genres.length <= 0 || state.map.overlays.length <= 0
  }
}

export default connect(mapStateToProps)(App)