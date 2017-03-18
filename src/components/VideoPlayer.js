import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  PLAYER_STATE_PAUSED,
  PLAYER_STATE_PLAYING,
  PLAYER_STATE_ENDED
} from '../constants'

import { nextTrack } from '../actions/TrackList'
import { ready, apiReady, load, stateChange, timeChange, error } from '../actions/Player'

class VideoPlayer extends Component {
  constructor() {
    super()
    window.onYouTubeIframeAPIReady = () => this.props.onApiReady()
    this.loadYoutubeApi()
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

  getVideo(tracklist, trackNo, index = 0, fallback = null) {
    if (!tracklist)
      return fallback

    const track = tracklist[trackNo]

    if (track)
      return Array.isArray(track.videos) ? track.videos[index] : track.videos

    return fallback
  }

  getNextVideo(props) {
    const { nowPlaying } = props
    // @todo handle video errors by skipping to next video in list
    return this.getVideo(nowPlaying.genre.tracklist, nowPlaying.trackNo, 0)
  }

  getCurrentVideoId() {
    return this.player ? this.player.getVideoData()['video_id'] : ''
  }

  watchCurrentTime() {
    if (this.currentTimer)
      clearInterval(this.currentTimer)

    this.currentTimer = setInterval(() => {
      if (this.player && this.props.playerState.playerReady)
        this.props.onPlaybackTime(this.player.getCurrentTime())
    }, 500)
  }

  initializePlayer() {
    if (!this.playerElement)
      return console.log('VideoPlayer - Player element not found')

    if (!YT || !YT.Player)
      return console.log('VideoPlayer - YouTube API not loaded')

    const { nowPlaying } = this.props

    const initialTrackNo   = nowPlaying.trackNo
    const initialYoutubeId = this.getVideo(nowPlaying.genre.tracklist, initialTrackNo, 0, 'Uq42HUUJFzU')

    this.player = new YT.Player(this.playerElement.id, {
      width:   '323',
      height:  '242',
      videoId: initialYoutubeId,
      events: {
        onReady:       ()  => this.props.onReady(initialYoutubeId, this.player.getVolume()),
        onStateChange: (e) => this.props.onStateChange(e.data),
        onError:       (e) => this.props.onError(e.data)
      },
      playerVars: {
        autoplay: 1,
        //controls: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      }
    })

    //this.watchCurrentTime()
  }

  componentWillReceiveProps(nextProps) {
    const { playerState, nowPlaying } = this.props
    const {
      nowPlaying:  nextNowPlaying,
      playerState: nextPlayerState
    } = nextProps

    // Initialize when API is ready
    if (nextPlayerState.apiReady !== playerState.apiReady) {
      this.initializePlayer()
    }

    // Everything after this requires the player to be ready
    if (!this.player || !nextPlayerState.playerReady)
      return

    // Video changed
    if (
      nextPlayerState.videoId &&
      nextPlayerState.videoId !== this.getCurrentVideoId()
    ) {
      this.player.loadVideoById(nextPlayerState.videoId)
    }

    // Volume changed
    if (nextPlayerState.volume !== this.player.getVolume()) {
      this.player.setVolume(nextPlayerState.volume)
    }

    // Play/pause
    if (nextPlayerState.state !== this.player.getPlayerState()) {
      if (nextPlayerState.state === PLAYER_STATE_PAUSED) {
        this.player.pauseVideo()
      } else if (nextPlayerState.state === PLAYER_STATE_PLAYING) {
        this.player.playVideo()
      }
    }

    // When video finishes play next track
    if (
      nextPlayerState.state !== playerState.state &&
      nextPlayerState.state === PLAYER_STATE_ENDED
    ) {
      this.props.nextTrack()
    }

    // Track/genre changed
    if (
      nowPlaying.genre.id !== nextNowPlaying.genre.id ||
      nowPlaying.trackNo !== nextNowPlaying.trackNo
    ) {
      this.props.loadVideo(this.getNextVideo(nextProps))
    }
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
    onReady:        (v, a)  => dispatch(ready(v, a)),
    onApiReady:     ()      => dispatch(apiReady()),
    onStateChange:  (s)     => dispatch(stateChange(s)),
    onError:        (e)     => dispatch(error(e)),
    onPlaybackTime: (t)     => dispatch(timeChange(t)),
    loadVideo:      (v)     => dispatch(load(v)),
    nextTrack:      ()      => dispatch(nextTrack()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer)