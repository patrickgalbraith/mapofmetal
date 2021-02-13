import React from "react";
import { TrackInfo } from "../../types";
import { formatSeconds, relativeMousePosition } from "../../helpers";

export type Props = {
  track: TrackInfo | null;
  currentTime: number;
  duration: number;
  volume: number;
  onPlayClick: () => void;
  onPauseClick: () => void;
  onVolumeChange: (volume: number) => void;
};

export default function PlayerControls(props: Props) {
  const {
    track,
    currentTime,
    duration,
    volume,
    onPlayClick,
    onPauseClick,
  } = props;

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let currentTarget = e.currentTarget;

    const pos = relativeMousePosition(e);
    const width =
      currentTarget instanceof HTMLElement ? currentTarget.clientWidth : 0;
    const volume = Math.round((pos.x / width) * 100);

    if (Number.isInteger(volume)) props?.onVolumeChange(volume);
  };

  return (
    <div className="PlayerControls">
      <div className="PlayerControls-left">
        <div className="PlayerControls-time">
          {formatSeconds(currentTime)} / {formatSeconds(duration)}
        </div>
        <div className="PlayerControls-controls">
          <div className="PlayerControls-play" onClick={onPlayClick}></div>
          <div className="PlayerControls-pause" onClick={onPauseClick}></div>
          <div
            className="PlayerControls-volume"
            onClick={(e) => handleVolumeClick(e)}
          >
            <div
              className="PlayerControls-volume-handle"
              style={{ width: volume + "%" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="PlayerControls-right">
        <div className="PlayerControls-title">
          {track?.title} ({track?.year})
        </div>
        <div className="PlayerControls-artist">{track?.artist}</div>
      </div>
    </div>
  );
}
