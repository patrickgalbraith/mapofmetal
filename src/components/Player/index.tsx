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

  const progress = duration ? currentTime / duration : 0;

  return (
    <div className="Player-container">
      {showNowPlaying && playingGenre && (
        <div className="NowPlaying">
          <button className="NowPlaying-currentGenre" onClick={onNowPlayingClick}>
            Now Playing: <strong>{playingGenre.title}</strong>
          </button>
          <button className="NowPlaying-stop" onClick={onStopClick}>
            <span className="visually-hidden">Stop</span>
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
              <p className="Player-info-title">{track.title}</p>
              <p className="Player-info-artist">{track.artist}</p>
            </div>
            <div className="Player-controls">
              <button className="Player-control Player-control--info">
                <span className="visually-hidden">Genre Info</span>
              </button>
              {playerState === PLAYER_STATE_PLAYING ? (
                <button
                  className="Player-control Player-control--pause"
                  onClick={onPauseClick}
                >
                  <span className="visually-hidden">Pause</span>
                </button>
              ) : (
                <button className="Player-control Player-control--play" onClick={onPlayClick}>
                  <span className="visually-hidden">Play</span>
                </button>
              )}
              <button
                className="Player-control Player-control--next"
                onClick={onNextTrackClick}
              >
                <span className="visually-hidden">Next Track</span>
              </button>
            </div>
            <div className="Player-playbar">
              <div
                className="Player-playbar-progress"
                style={{ transform: `scale3d(${progress}, 1, 1` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
