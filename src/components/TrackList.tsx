import React from "react"
import { Component } from "react"
import { GenreInfo as GenreInfoItem, TrackInfo } from "../types"

type Props = {
  current?: GenreInfoItem
  playing?: {
    genre?: GenreInfoItem
    trackNo: number
  }
  onTrackClick: (index: number) => void
}

export default class TrackList extends Component<Props> {
  render() {
    const {
      current,
      playing,
      onTrackClick
    } = this.props

    const getTrackLabel = (track: TrackInfo) =>
      `${track.title} - ${track.artist} (${track.year})`

    const isPlaying = (_track: TrackInfo, idx: number) =>
      playing?.genre?.id === current?.id && idx === playing?.trackNo

    return <div className='TrackList'>
        <div className='TrackList-content'>
          <ul>
            {current?.tracklist.map((track, idx) =>
              <li
                key={idx}
                title={getTrackLabel(track)}
                className={[
                  isPlaying(track, idx) ? 'is-playing' : '',
                  track._failed ? 'has-failed' : ''
                ].join(' ')}
                onClick={() => onTrackClick(idx)}
              >
                {getTrackLabel(track)}
              </li>
            )}
          </ul>
        </div>
      </div>
  }
}