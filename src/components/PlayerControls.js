// @flow
import type { TrackInfo } from '../types'
import React, { Component, PropTypes } from 'react'
import { formatSeconds, relativeMousePosition } from '../helpers'

type Props = {
  track: TrackInfo,
  currentTime: number,
  duration: number,
  volume: number,
  onPlayClick: () => void,
  onPauseClick: () => void,
  onVolumeChange: (number) => void
}

export default class PlayerControls extends Component {
  props: Props

  handleVolumeClick(e: MouseEvent) {
    let currentTarget = e.currentTarget

    const pos    = relativeMousePosition(e)
    const width  = currentTarget instanceof HTMLElement ? currentTarget.clientWidth : 0
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