// @flow
import type { Props } from '../components/VideoPlayer'
import type { State as ReduxState } from '../reducers'
import type { ThunkedDispatch as Dispatch } from '../types'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import VideoPlayer from '../components/VideoPlayer'

import { nextTrack } from '../actions/TrackList'
import { ready, apiReady, load, stateChange, durationChange, error } from '../actions/Player'

class VideoPlayerContainer extends Component {
  props: Props

  render() {
    return <VideoPlayer {...this.props} />
  }
}

const mapStateToProps = (state: ReduxState, ownProps: Props) => {
  return {
    playerState: state.player,
    nowPlaying: {
      genre:   state.genres.find(g => g.id === state.app.nowPlaying.genre),
      trackNo: state.app.nowPlaying.trackNo,
      videoNo: state.app.nowPlaying.videoNo
    }
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onReady:        (v: string, a: number) => dispatch(ready(v, a)),
    onApiReady:     ()                     => dispatch(apiReady()),
    onStateChange:  (s: number)            => dispatch(stateChange(s)),
    onError:        (e: number)            => dispatch(error(e)),
    onDuration:     (d: number)            => dispatch(durationChange(d)),
    loadVideo:      (v: string)            => dispatch(load(v)),
    nextTrack:      ()                     => dispatch(nextTrack()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayerContainer)