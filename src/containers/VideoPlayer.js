import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import VideoPlayer from '../components/VideoPlayer'

import { nextTrack } from '../actions/TrackList'
import { ready, apiReady, load, stateChange, durationChange, error } from '../actions/Player'

class VideoPlayerContainer extends Component {
  render() {
    return <VideoPlayer {...this.props} />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playerState: state.player,
    nowPlaying: {
      genre:   state.genres.find(g => g.id === state.app.nowPlaying.genre),
      trackNo: state.app.nowPlaying.trackNo,
      videoNo: state.app.nowPlaying.videoNo
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReady:        (v, a) => dispatch(ready(v, a)),
    onApiReady:     ()     => dispatch(apiReady()),
    onStateChange:  (s)    => dispatch(stateChange(s)),
    onError:        (e)    => dispatch(error(e)),
    onDuration:     (d)    => dispatch(durationChange(d)),
    loadVideo:      (v)    => dispatch(load(v)),
    nextTrack:      ()     => dispatch(nextTrack()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayerContainer)