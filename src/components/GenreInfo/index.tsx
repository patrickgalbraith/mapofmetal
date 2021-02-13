import { GenreInfo as GenreInfoItem } from "../../types";

type Props = {
  current?: GenreInfoItem;
  playing?: GenreInfoItem;
  onNowPlayingClick: () => void;
};

export default function GenreInfo(props: Props) {
  const { current, playing, onNowPlayingClick } = props;

  const showNowPlaying = playing && current?.id !== playing.id;

  return (
    <div>
      {showNowPlaying && (
        <div className="NowPlaying" onClick={onNowPlayingClick}>
          Now Playing: <strong>{playing!.title}</strong>
        </div>
      )}

      {current && (
        <div className="GenreInfo">
          <div className="GenreInfo-content">
            {current.subtitle && (
              <div className="GenreInfo-subtitle">{current.subtitle}</div>
            )}
            <div className="GenreInfo-title">{current.title}</div>
            <div
              className="GenreInfo-description"
              dangerouslySetInnerHTML={{ __html: current.description }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
