import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import VideoPlayer from '../components/VideoPlayer'
import TopBar from '../components/TopBar'
import PlayerControls from '../components/PlayerControls'
import MapLayer from '../components/MapLayer'
import LoadingSplash from '../components/LoadingSplash'
import GenreInfo from './GenreInfo'
import AboutModal from '../components/modals/About'
import SettingsModal from '../components/modals/Settings'
import ShareModal from '../components/modals/Share'

import { MAP_TILE_SOURCE } from '../constants'

import { changeMapCenter } from '../actions/Map'
import { selectGenre, fetchGenreInfo, fetchGenreOverlays } from '../actions/Genre'

class App extends Component {
  constructor() {
    super()

    this.state = {
      entered: false
    }
  }

  componentDidMount() {
    const { fetchGenreInfo, fetchGenreOverlays } = this.props
    fetchGenreInfo()
    fetchGenreOverlays()
  }

  changeGenre(genreId) {
    const { selectGenre } = this.props
    selectGenre(genreId)
  }

  render() {
    const { entered } = this.state
    const {
      loading,
      overlays,
      currentGenre,
      currentVideo,
      playerPosition,
      genreInfo,
      mapCenter,
      changeMapCenter
    } = this.props

    let Modal = SettingsModal

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
                <TopBar changeMapCenter={changeMapCenter} />

                <VideoPlayer current={currentVideo} />

                <GenreInfo current={currentGenre}
                           genres={genreInfo} />

                <PlayerControls position={playerPosition} />

                { Modal ?
                  <ReactCSSTransitionGroup
                    transitionName="transition"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}>
                    <Modal />
                  </ReactCSSTransitionGroup>
                : null }

                <MapLayer tileSources={MAP_TILE_SOURCE}
                          overlays={overlays}
                          onOverlayClick={(genreId) => this.changeGenre(genreId)}
                          centerPosition={mapCenter} />
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
    loading: state.genres.length <= 0 || state.map.overlays.length <= 0,
    mapCenter: state.map.center,
    dispatch: state.dispatch
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenreInfo:     ()       => dispatch(fetchGenreInfo()),
    fetchGenreOverlays: ()       => dispatch(fetchGenreOverlays()),
    selectGenre:        (id)     => dispatch(selectGenre(id)),
    changeMapCenter:    (center) => dispatch(changeMapCenter(center))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)