import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import VideoPlayer from '../components/VideoPlayer'
import TopBar from '../components/TopBar'
import PlayerControls from '../components/PlayerControls'
import MapLayer from '../components/MapLayer'
import LoadingSplash from '../components/LoadingSplash'
import GenreInfo from '../components/GenreInfo'
import TrackList from '../components/TrackList'
import AboutModal from '../components/modals/About'
import SettingsModal from '../components/modals/Settings'
import ShareModal from '../components/modals/Share'

import { MAP_TILE_SOURCE } from '../constants'

import { skipToTrack } from '../actions/TrackList'
import { changeMapCenter, dragStart, dragEnd } from '../actions/Map'
import { selectGenre, fetchGenreInfo, fetchGenreOverlays } from '../actions/Genre'

class App extends Component {
  constructor() {
    super()

    this.state = {
      entered: false,
      currentModal: null
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

  openModal(type) {
    let currentModal = null

    switch(type) {
      case 'About':
        currentModal = {
          key: type,
          component: AboutModal
        }
        break
      case 'Settings':
        currentModal = {
          key: type,
          component: SettingsModal
        }
        break
      case 'Share':
        currentModal = {
          key: type,
          component: ShareModal
        }
        break
    }

    this.setState({ currentModal })
  }

  closeModal() {
    this.setState({
      currentModal: null
    })
  }

  changeTrack(trackNo) {
    this.props.skipToTrack(this.props.currentGenre.id, trackNo)
  }

  render() {
    const { entered, currentModal } = this.state
    const {
      loading,
      overlays,
      currentGenre,
      currentTrackList,
      currentVideo,
      playerPosition,
      mapCenter,
      mapDragging,
      changeMapCenter,
      dragStart,
      dragEnd
    } = this.props

    let Modal = currentModal ? currentModal.component : null

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
              <div key='main' className={['AppMain', (mapDragging ? 'is-dragging' : '')].join(' ')}>
                <TopBar changeMapCenter={changeMapCenter}
                        openModal={this.openModal.bind(this)} />

                <VideoPlayer current={currentVideo} />

                <GenreInfo current={currentGenre} playing={currentTrackList.genre} onNowPlayingClick={() => {}} />

                <TrackList current={currentGenre} playing={currentTrackList} onTrackClick={(trackNo) => this.changeTrack(trackNo)} />

                <PlayerControls position={playerPosition} />

                <ReactCSSTransitionGroup
                  transitionName="transition"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}>
                  { Modal ?
                    <Modal key={currentModal.key} close={() => this.closeModal()} />
                  : null }
                </ReactCSSTransitionGroup>

                <MapLayer tileSources={MAP_TILE_SOURCE}
                          overlays={overlays}
                          centerPosition={mapCenter}
                          onOverlayClick={(genreId) => this.changeGenre(genreId)}
                          onDragStart={() => dragStart()}
                          onDragEnd={() => dragEnd()} />
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
    overlays:         state.map.overlays,
    currentGenre:     state.genres.find(g => g.id === state.app.selectedGenre),
    currentTrackList: {
      genre:   state.genres.find(g => g.id === state.app.nowPlaying.genre),
      trackNo: state.app.nowPlaying.trackNo
    },
    currentVideo:     {  },
    loading:          state.genres.length <= 0 || state.map.overlays.length <= 0,
    mapCenter:        state.map.center,
    mapDragging:      state.map.dragging
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenreInfo:     ()     => dispatch(fetchGenreInfo()),
    fetchGenreOverlays: ()     => dispatch(fetchGenreOverlays()),
    selectGenre:        (i)    => dispatch(selectGenre(i)),
    changeMapCenter:    (c)    => dispatch(changeMapCenter(c)),
    dragStart:          ()     => dispatch(dragStart()),
    dragEnd:            ()     => dispatch(dragEnd()),
    skipToTrack:        (g, t) => dispatch(skipToTrack(g, t))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)