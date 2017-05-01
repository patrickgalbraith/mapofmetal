// @flow
import type { GenreInfo as GenreInfoItem, GenreOverlay, TrackInfo, MapCenterPoint, ThunkedDispatch as Dispatch } from '../types'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import VideoPlayer from './VideoPlayer'
import TopBar from '../components/TopBar'
import PlayerControls from './PlayerControls'
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
import { selectGenre } from '../actions/Genre'

class MapPage extends Component {
  state: {
    currentModal: ?{
      key: string,
      component: AboutModal | SettingsModal | ShareModal | void
    },
    currentTime: number
  }

  props: {
    key: ?string,
    className: ?string,
    overlays: GenreOverlay[],
    currentGenre: GenreInfoItem,
    currentTrackList: {
      genre: GenreInfoItem,
      trackNo: number
    },
    mapCenter: MapCenterPoint,
    mapDragging: boolean,
    selectGenre: Dispatch,
    changeMapCenter: Dispatch,
    dragStart: Dispatch,
    dragEnd: Dispatch,
    skipToTrack: Dispatch
  }

  constructor() {
    super()

    this.state = {
      currentModal: null,
      currentTime: 0
    }
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
    const {
      currentModal,
      currentTime
    } = this.state

    const {
      overlays,
      currentGenre,
      currentTrackList,
      mapCenter,
      mapDragging,
      changeMapCenter,
      dragStart,
      dragEnd
    } = this.props

    const Modal   = currentModal ? currentModal.component : null
    const classes = ['MapPage', this.props.className, (mapDragging ? 'is-dragging' : '')].join(' ')

    return (
      <div className={classes} key={this.props.key}>
        <TopBar changeMapCenter={changeMapCenter}
                openModal={this.openModal.bind(this)} />

        <VideoPlayer onPlaybackTime={(s) => { this.setState({currentTime: s}) }} />

        <GenreInfo current={currentGenre}
                   playing={currentTrackList.genre}
                   onNowPlayingClick={() => this.changeGenre(currentTrackList.genre.id) } />

        <TrackList current={currentGenre}
                   playing={currentTrackList}
                   onTrackClick={(trackNo) => this.changeTrack(trackNo)} />

        <PlayerControls currentTime={currentTime} />

        <ReactCSSTransitionGroup
          transitionName="transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          { Modal ?
            <Modal key={currentModal ? currentModal.key : null} close={() => this.closeModal()} />
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    overlays:         state.map.overlays,
    currentGenre:     state.genres.find(g => g.id === state.app.selectedGenre),
    currentTrackList: {
      genre:   state.genres.find(g => g.id === state.app.nowPlaying.genre),
      trackNo: state.app.nowPlaying.trackNo
    },
    mapCenter:        state.map.center,
    mapDragging:      state.map.dragging
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectGenre:     (i)    => dispatch(selectGenre(i)),
    changeMapCenter: (c)    => dispatch(changeMapCenter(c)),
    dragStart:       ()     => dispatch(dragStart()),
    dragEnd:         ()     => dispatch(dragEnd()),
    skipToTrack:     (g, t) => dispatch(skipToTrack(g, t))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapPage)