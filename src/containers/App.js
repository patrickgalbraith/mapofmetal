import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import VideoPlayer from '../components/VideoPlayer'
import TopBar from '../components/TopBar'
import PlayerControls from '../components/PlayerControls'
import MapLayer from '../components/MapLayer'
import LoadingSplash from '../components/LoadingSplash'
import GenreInfo from './GenreInfo'

import { selectGenre, fetchGenreInfo, fetchGenreOverlays } from '../actions/Genre'

const MAP_TILE_SOURCE = '/tiles/map.xml'

class App extends Component {
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
    const {
      loading,
      overlays,
      currentGenre,
      currentVideo,
      playerPosition,
      genreInfo
    } = this.props

    if (loading) {
      return (
        <div className='App'>
          <LoadingSplash />
        </div>
      )
    }

    return (
      <div className='App'>
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    overlays: state.map.overlays,
    currentGenre: state.selectedGenre,
    loading: state.genres.length <= 0 || state.map.overlays.length <= 0
  }
}

export default connect(mapStateToProps)(App)