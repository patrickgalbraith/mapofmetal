import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { ready, apiReady, stateChange, error } from '../actions/Player'

class VideoPlayer extends Component {
  constructor() {
    super()
    window.onYouTubeIframeAPIReady = () => this.props.onApiReady()
    loadYoutubeApi()
  }

  render() {
    return <div className='VideoPlayerPlaceholder' />
  }

  shouldComponentUpdate() {
    return false
  }

  loadYoutubeApi() {
    const id             = 'youtube-api-script'
    const tag            = document.createElement('script')
    const firstScriptTag = document.getElementsByTagName('script')[0]

    if (document.getElementById(id) !== null)
      return console.log('VideoPlayer - YouTube API already loaded')

    tag.id  = id
    tag.src = "https://www.youtube.com/iframe_api"

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }

  initializePlayer() {
    if (!this.playerElement)
      return console.log('VideoPlayer - Player element not found')

    if (!YT || !YT.Player)
      return console.log('VideoPlayer - YouTube API not loaded')

    const { nowPlaying } = this.props

    const initialTrackNo   = nowPlaying.trackNo
    const initialYoutubeId = nowPlaying.genre.tracklist[initialTrackNo]

    this.player = new YT.Player(this.playerElement.id, {
      width:   '323',
      height:  '242',
      videoId: initialYoutubeId,
      events: {
        onReady:       ()  => this.props.onReady(),
        onStateChange: (e) => this.props.onStateChange(e.data),
        onError:       (e) => this.props.onError(e.data)
      }
    })
  }

  componentDidMount() {
    this.playerElement           = document.createElement('div')
    this.playerElement.id        = 'yt-video-player'
    this.playerElement.className = 'VideoPlayer'

    document.body.appendChild(this.playerElement)
  }

  componentWillUnmount() {
    this.player.destroy()
    document.body.removeChild(this.playerElement)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    playerState: state.player,
    nowPlaying: {
      genre:   state.genres.find(g => g.id === state.app.nowPlaying.genre),
      trackNo: state.app.nowPlaying.trackNo
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onReady:       ()  => dispatch(ready()),
    onApiReady:    ()  => dispatch(apiReady()),
    onStateChange: (s) => dispatch(stateChange(s)),
    onError:       (e) => dispatch(error(e)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer)