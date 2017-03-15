import React, { Component, PropTypes } from 'react'

export default class GenreInfo extends Component {
  render() {
    const { current, playing, onNowPlayingClick } = this.props
    const showNowPlaying = playing && current.id != playing.id

    return (
      <div>
        { showNowPlaying ?
          <div className='NowPlaying' onClick={onNowPlayingClick}>
            Now Playing: <strong>{playing.title}</strong>
          </div>
        : null }

        <div className='GenreInfo'>
          <div className='GenreInfo-content'>
            <div className='GenreInfo-title'>{ current.title }</div>
            <div className='GenreInfo-description' dangerouslySetInnerHTML={{__html: current.description}} />
          </div>
        </div>
      </div>
    )
  }
}