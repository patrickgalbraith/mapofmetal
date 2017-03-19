import React, { Component, PropTypes } from 'react'
import { formatSeconds, relativeMousePosition } from '../helpers'

export default class PlayerControls extends Component {
  handleVolumeClick(e) {
    const pos    = relativeMousePosition(e)
    const width  = e.currentTarget.clientWidth
    const volume = Math.round(pos.x / width * 100)

    if (Number.isInteger(volume))
      this.props.onVolumeChange(volume)
  }

  render() {
    const {
      track,
      currentTime,
      duration,
      volume,
      onPlayClick,
      onPauseClick,
      onVolumeChange
    } = this.props

    return (
      <div className='PlayerControls'>
        <div className='PlayerControls-left'>
          <div className='PlayerControls-time'>
            {formatSeconds(currentTime)} / {formatSeconds(duration)}
          </div>
          <div className='PlayerControls-controls'>
            <div className='PlayerControls-play' onClick={onPlayClick}></div>
            <div className='PlayerControls-pause' onClick={onPauseClick}></div>
            <div className='PlayerControls-volume' onClick={(e) => this.handleVolumeClick(e)}>
              <div className='PlayerControls-volume-handle' style={{width: volume + '%'}}></div>
            </div>
          </div>
        </div>
        <div className='PlayerControls-right'>
          <div className='PlayerControls-title'>{ track.title } ({ track.year })</div>
          <div className='PlayerControls-artist'>{ track.artist }</div>
        </div>
      </div>
    )
  }
}