import React from "react"
import { Component } from "react"
import { State as PlayerState } from "../reducers/player"
import { GenreInfo as GenreInfoItem, TrackInfo } from "../types"
import {
  PLAYER_STATE_PAUSED, PLAYER_STATE_PLAYING,
  PLAYER_STATE_ENDED
} from "../constants"

export type Props = {
  playerState: PlayerState
  nowPlaying: {
    genre?: GenreInfoItem
    trackNo: number
    videoNo: number
  }
  onApiReady: () => void
  onReady: (initialYoutubeId: string, initialVolume: number) => void
  onStateChange: (playerState: number) => void
  onError: (errorCode: number) => void
  nextTrack: () => void
  loadVideo: (videoId: string) => void
  onDuration: (duration: number) => void
  onPlaybackTime: (time: number) => void
}

export default class VideoPlayer extends Component<Props> {
  player: YT.Player | undefined
  playerElement: HTMLDivElement | undefined
  currentTimer: NodeJS.Timeout | undefined
  currentVideoIdFallback: string | null = null

  constructor(props: Props | Readonly<Props>) {
    super(props)
    window.onYouTubeIframeAPIReady = () => this.props.onApiReady()
    this.loadYoutubeApi()
  }

  render() {
    return <div className='VideoPlayerPlaceholder' />
  }

  shouldComponentUpdate() {
    return false
  }

  loadYoutubeApi(): void {
    const id = 'youtube-api-script'
    const tag = document.createElement('script')
    const firstScriptTag = document.getElementsByTagName('script')[0]

    if (document.getElementById(id) !== null)
      return console.log('VideoPlayer - YouTube API already loaded')

    tag.id = id
    tag.src = "https://www.youtube.com/iframe_api"

    if (firstScriptTag.parentNode)
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }

  getVideo(tracklist: TrackInfo[], trackNo: number, index: number = 0, fallback: string = ''): string {
    if (!tracklist)
      return fallback

    const track = tracklist[trackNo]

    if (track)
      return Array.isArray(track.videos) ? track.videos[index] : track.videos

    return fallback
  }

  getNextVideo(props: Props): string {
    const { nowPlaying } = props
    return this.getVideo(nowPlaying.genre?.tracklist ?? [], nowPlaying.trackNo, nowPlaying.videoNo)
  }

  getCurrentVideoId(): string | null {
    const player: any = this.player // getVideoData is an undocumented internal function
    const videoData = player && player.getVideoData ? player.getVideoData() : null
    return videoData?.['video_id'] ?? this.currentVideoIdFallback
  }

  getDuration(): number {
    const duration = this.player ? Math.round(this.player.getDuration()) : 0
    return duration ? this.player?.getDuration() ?? 0 : 0
  }

  watchCurrentTime(): void {
    if (this.currentTimer)
      clearInterval(this.currentTimer)

    this.currentTimer = setInterval(() => {
      if (this.player && this.props.playerState.playerReady)
        this.props.onPlaybackTime(Math.round(this.player.getCurrentTime()))
    }, 1000)
  }

  initializePlayer() {
    if (!this.playerElement)
      return console.log('VideoPlayer - Player element not found')

    if (!YT || !YT.Player)
      return console.log('VideoPlayer - YouTube API not loaded')

    const { nowPlaying } = this.props

    const initialTrackNo = nowPlaying.trackNo
    const initialYoutubeId = this.getVideo(nowPlaying.genre?.tracklist ?? [], initialTrackNo, 0, 'Uq42HUUJFzU')
    const initialVolume = (player: YT.Player) => player.isMuted() ? 0 : player.getVolume()

    this.player = new YT.Player(this.playerElement.id, {
      width: '323',
      height: '242',
      videoId: initialYoutubeId,
      events: {
        onReady: () => this.props.onReady(initialYoutubeId, initialVolume(this.player!)),
        onStateChange: e => this.props.onStateChange(e.data),
        onError: e => this.props.onError(e.data)
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

    this.currentVideoIdFallback = initialYoutubeId

    this.watchCurrentTime()
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    const { playerState, nowPlaying } = this.props

    const {
      nowPlaying: nextNowPlaying,
      playerState: nextPlayerState
    } = nextProps

    // Initialize when API is ready
    if (nextPlayerState.apiReady !== playerState.apiReady) {
      setTimeout((): void => {
        this.initializePlayer()
      }, 3000)
    }

    // Everything after this requires the player to be ready
    if (!this.player || !nextPlayerState.playerReady)
      return

    // Video changed
    if (nextPlayerState.videoId
      && this.getCurrentVideoId()
      && nextPlayerState.videoId !== this.getCurrentVideoId()
    ) {
      this.player.loadVideoById({
        videoId: nextPlayerState.videoId,
        suggestedQuality: nextPlayerState.quality
      })

      this.currentVideoIdFallback = nextPlayerState.videoId
    }

    // Volume changed
    if (nextPlayerState.volume !== this.player.getVolume()) {
      if (nextPlayerState.volume != null)
        this.player.setVolume(nextPlayerState.volume)

      if (this.player.isMuted())
        this.player.unMute()
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
      nextPlayerState.state !== playerState.state
      && nextPlayerState.state === PLAYER_STATE_ENDED
    ) {
      this.props.nextTrack()
    }

    // Track/genre changed
    if (
      nowPlaying.genre?.id !== nextNowPlaying.genre?.id ||
      nowPlaying.trackNo !== nextNowPlaying.trackNo ||
      nowPlaying.videoNo !== nextNowPlaying.videoNo
    ) {
      this.props.loadVideo(this.getNextVideo(nextProps))
    }

    // Get duration when playing starts
    if (nextPlayerState.duration !== this.getDuration()) {
      this.props.onDuration(this.getDuration())
    }
  }

  componentDidMount() {
    this.playerElement = document.createElement('div')
    this.playerElement.id = 'yt-video-player'
    this.playerElement.className = 'VideoPlayer'

    if (document.body)
      document.body.appendChild(this.playerElement)

    setTimeout((): void => {
      this.playerElement?.classList.add('active')
    }, 2500)
  }

  componentWillUnmount() {
    this.player?.destroy()

    if (document.body && this.playerElement)
      document.body.removeChild(this.playerElement)
  }
}