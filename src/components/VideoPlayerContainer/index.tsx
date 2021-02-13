import { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../reducers";
import VideoPlayer, {
  Props as VideoPlayerProps,
} from "../YoutubeVideoPlayer";
import { nextTrack } from "../../actions/TrackList";
import {
  ready,
  apiReady,
  load,
  stateChange,
  durationChange,
  error,
} from "../../actions/Player";

export type Props = Omit<
  VideoPlayerProps,
  keyof DispatchProps | keyof StateProps
> &
  StateProps &
  DispatchProps;

class VideoPlayerContainer extends Component<Props> {
  render() {
    return <VideoPlayer {...this.props} />;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    playerState: state?.player,
    nowPlaying: {
      genre: state.genres.find((g) => g.id === state?.app.nowPlaying.genre),
      trackNo: state?.app.nowPlaying.trackNo,
      videoNo: state?.app.nowPlaying.videoNo,
    },
  };
};

const actionCreators = {
  onReady: ready,
  onApiReady: apiReady,
  onStateChange: stateChange,
  onError: error,
  onDuration: durationChange,
  loadVideo: load,
  nextTrack: nextTrack as () => any,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actionCreators;

export default connect(mapStateToProps, actionCreators)(VideoPlayerContainer);
