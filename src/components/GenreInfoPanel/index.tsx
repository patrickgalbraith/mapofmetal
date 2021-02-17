import { GenreInfo, TrackInfo } from "../../types";

export type Props = {
  currentGenre?: GenreInfo;
  playing?: {
    genre?: GenreInfo;
    trackNo: number;
  };
  onTrackClick: (index: number) => void;
  onCloseClick: () => void;
};

export default function GenreInfoPanel(props: Props) {
  const { currentGenre, playing, onTrackClick, onCloseClick } = props;

  if (!currentGenre) return null;

  const getTrackLabel = (track: TrackInfo) =>
    `${track.title} - ${track.artist} (${track.year})`;

  const isPlaying = (_track: TrackInfo, idx: number) =>
    playing?.genre?.id === currentGenre?.id && idx === playing?.trackNo;

  return (
    <section className="GenreInfoPanel">
      <header className="GenreInfoPanel-header">
        <p className="GenreInfoPanel-preheading">GENRE INFORMATION</p>
        {currentGenre.subtitle && (
          <p className="GenreInfoPanel-subtitle">{currentGenre.subtitle}</p>
        )}
        <p className="GenreInfoPanel-title">{currentGenre.title}</p>
        <button className="GenreInfoPanel-close" onClick={onCloseClick}>
          <span className="visually-hidden">Close</span>
        </button>
      </header>
      <div className="GenreInfoPanel-content">
        <div
          className="GenreInfoPanel-description"
          dangerouslySetInnerHTML={{ __html: currentGenre.description }}
        ></div>

        <div className="GenreInfoPanel-tracklist">
          <ul className="Tracklist">
            {currentGenre?.tracklist.map((track, idx) => (
              <li
                key={idx}
                title={getTrackLabel(track)}
                className={[
                  "Tracklist-track",
                  isPlaying(track, idx) ? "--is-playing" : "",
                  track._failed ? "--has-failed" : "",
                ].join(" ")}
                onClick={() => onTrackClick(idx)}
              >
                <p className="Tracklist-title">{track.title}</p>
                <p className="Tracklist-subtitle">
                  {track.artist} ({track.year})
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
