// @flow
import type { State } from '../reducers'
import type { TrackInfo } from '../types'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import PlayerControls from '../components/PlayerControls'

import { play, pause, volume } from '../actions/Player'

type Props = {
  duration: number,
  volume: ?number,
  track: ?TrackInfo
}

class PlayerControlsContainer extends Component {
  render() {
    return <PlayerControls {...this.props} />
  }
}

const getCurrentTrack = (state: State): ?TrackInfo => {
  if (state == null)
    return

  const { nowPlaying } = state.app
  const genre          = state.genres.find(g => g.id === nowPlaying.genre)
  const trackNo        = nowPlaying.trackNo

  if (genre == null)
    return

  return genre.tracklist[trackNo]
}

const mapStateToProps = (state: State): ?Props => {
  if (state == null) {
    return
  }

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