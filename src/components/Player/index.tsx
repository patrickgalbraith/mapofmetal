import VideoPlayerContainer from "../VideoPlayerContainer";
import { GenreInfo as GenreInfoItem, TrackInfo } from "../../types";
import { PLAYER_STATE_PLAYING } from "../../constants";

export type Props = {
  playingGenre?: GenreInfoItem;
  showNowPlaying: boolean;
  track: TrackInfo | null;
  playerState: number;
  currentTime: number;
  duration: number;

  onPlayClick: () => void;
  onPauseClick: () => void;
  onNowPlayingClick: () => void;
  onPlaybackTime: (time: number) => void;
  onStopClick: () => void;
  onNextTrackClick: () => void;
};

export default function Player(props: Props) {
  const {
    track,
    playerState,
    playingGenre,
    showNowPlaying,
    currentTime,
    duration,
    onPlayClick,
    onPauseClick,
    onNowPlayingClick,
    onPlaybackTime,
    onStopClick,
    onNextTrackClick,
  } = props;

  const percentagePlayed = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="Player-container">
      {showNowPlaying && playingGenre && (
        <div className="NowPlaying" onClick={onNowPlayingClick}>
          Now Playing: <strong>{playingGenre.title}</strong>
          <button className="NowPlaying-stop" onClick={onStopClick}>
            Stop
          </button>
        </div>
      )}

      {track && (
        <div className="Player">
          <div className="Player-video">
            <VideoPlayerContainer onPlaybackTime={onPlaybackTime} />
          </div>
          <div className="Player-controller">
            <div className="Player-info">
              <p>{track.title}</p>
              <p>{track.artist}</p>
            </div>
            <div className="Player-controls">
              <button className="Player-controls-info">Genre Info</button>
              {playerState === PLAYER_STATE_PLAYING ? (
                <button
                  className="Player-controls-pause"
                  onClick={onPauseClick}
                >
                  Pause
                </button>
              ) : (
                <button className="Player-controls-play" onClick={onPlayClick}>
                  Play
                </button>
              )}
              <button
                className="Player-controls-next"
                onClick={onNextTrackClick}
              >
                Next Track
              </button>
            </div>
            <div className="Player-playbar">
              <div
                className="Player-playbar-progress"
                style={{ width: percentagePlayed + "%" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
