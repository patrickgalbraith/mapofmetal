// @flow
import type { State } from '../reducers'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PlayerControls from '../components/PlayerControls'

import { play, pause, volume } from '../actions/Player'

class PlayerControlsContainer extends Component {
  render() {
    return <PlayerControls {...this.props} />
  }
}

const getCurrentTrack = (state: State) => {
  const { nowPlaying } = state.app
  const genre          = state.genres.find(g => g.id === nowPlaying.genre)
  const trackNo        = nowPlaying.trackNo
  return genre.tracklist[trackNo]
}

const mapStateToProps = (state: State, ownProps) => {
  return {
    duration: state.player.duration,
    volume: state.player.volume,
    track: getCurrentTrack(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlayClick:    ()  => dispatch(play()),
    onPauseClick:   ()  => dispatch(pause()),
    onVolumeChange: (v) => dispatch(volume(v))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerControlsContainer)