
import { Props } from "../components/VideoPlayer";
import { State as ReduxState } from "../reducers";
import { Dispatch } from "../types";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import VideoPlayer from "../components/VideoPlayer";

import { nextTrack } from "../actions/TrackList";
import { ready, apiReady, load, stateChange, durationChange, error } from "../actions/Player";

class VideoPlayerContainer extends Component {

  props: Props;

  render() {
    return <VideoPlayer {...this.props} />;
  }
}

const mapStateToProps = (state: ReduxState, ownProps: Props) => {
  return {
    playerState: state.player,
    nowPlaying: {
      genre: state.genres.find(g => g.id === state.app.nowPlaying.genre),
      trackNo: state.app.nowPlaying.trackNo,
      videoNo: state.app.nowPlaying.videoNo
    }
  };
};

const actionCreators = {
  onReady: ready,
  onApiReady: apiReady,
  onStateChange: stateChange,
  onError: error,
  onDuration: durationChange,
  loadVideo: load,
  nextTrack: nextTrack
};

export default connect(mapStateToProps, actionCreators)(VideoPlayerContainer);