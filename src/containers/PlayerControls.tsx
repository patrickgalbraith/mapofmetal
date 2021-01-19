
import { Props } from "../components/PlayerControls";
import { State } from "../reducers";
import { TrackInfo } from "../types";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import PlayerControls from "../components/PlayerControls";

import { play, pause, volume } from "../actions/Player";

class PlayerControlsContainer extends Component {

  props: Props;

  render() {
    return <PlayerControls {...this.props} />;
  }
}

const getCurrentTrack = (state: State): TrackInfo | null | undefined => {
  if (state == null) return;

  const {
    nowPlaying
  } = state.app;
  const genre = state.genres.find(g => g.id === nowPlaying.genre);
  const trackNo = nowPlaying.trackNo;

  if (genre == null) return;

  return genre.tracklist[trackNo];
};

const mapStateToProps = (state: State): any => {
  if (state == null) return {};

  return {
    duration: state.player.duration,
    volume: state.player.volume,
    track: getCurrentTrack(state)
  };
};

const actionCreators = {
  onPlayClick: play,
  onPauseClick: pause,
  onVolumeChange: volume
};

export default connect(mapStateToProps, actionCreators)(PlayerControlsContainer);