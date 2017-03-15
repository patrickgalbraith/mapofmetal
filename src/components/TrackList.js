import React, { Component, PropTypes } from 'react'

export default class TrackList extends Component {
  render() {
    const { current, playing } = this.props

    const getTrackLabel = (track) =>
      `${track.title} - ${track.artist} (${track.year})`

    const isPlaying = (track, idx) =>
      playing.genre.id === current.id && idx === playing.trackNo

    return (
      <div className='TrackList'>
        <div className='TrackList-content'>
          <ul>
            { current.tracklist.map((track, idx) => (
              <li key={idx}
                  title={getTrackLabel(track)}
                  className={isPlaying(track, idx) ? 'is-playing' : ''}>
                { getTrackLabel(track) }
              </li>
            )) }
          </ul>
        </div>
      </div>
    )
  }
}