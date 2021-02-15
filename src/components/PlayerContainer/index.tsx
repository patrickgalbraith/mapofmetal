import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import { TrackInfo } from "../../types";
import Player, { Props as PlayerProps } from "../Player";
import { play, pause, stop } from "../../actions/Player";
import { nextTrack } from "../../actions/TrackList";

export type Props = Omit<PlayerProps, keyof DispatchProps | keyof StateProps> &
  StateProps &
  DispatchProps;

function PlayerContainer(props: Props) {
  return <Player {...props} />;
}

const getCurrentTrack = (
  state: RootState | null | undefined
): TrackInfo | null => {
  if (!state) return null;

  const { nowPlaying } = state.app;
  const genre = state.genres.find((g) => g.id === nowPlaying.genre);
  const trackNo = nowPlaying.trackNo;

  if (genre == null) return null;

  return genre.tracklist[trackNo];
};

const mapStateToProps = (state: RootState) => {
  return {
    playingGenre: state.genres.find(
      (g) => g.id === state?.app.nowPlaying.genre
    ),
    duration: state?.player.duration ?? 1,
    playerState: state?.player.state,
    track: getCurrentTrack(state),
  };
};

const actionCreators = {
  onPlayClick: play,
  onPauseClick: pause,
  onStopClick: stop,
  onNextTrackClick: nextTrack as () => any,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actionCreators;

export default connect(mapStateToProps, actionCreators)(PlayerContainer);
