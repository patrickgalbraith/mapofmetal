import React, { Component } from "react"
import { connect } from "react-redux"
import { RootState } from "../reducers"
import { TrackInfo } from "../types"
import PlayerControls, { Props as PlayerControlsProps } from "../components/PlayerControls"
import { play, pause, volume } from "../actions/Player"

export type Props = Omit<PlayerControlsProps, keyof DispatchProps | keyof StateProps> & StateProps & DispatchProps

class PlayerControlsContainer extends Component<Props> {
  render() {
    return <PlayerControls {...this.props} />
  }
}

const getCurrentTrack = (state: RootState | null | undefined): TrackInfo | null => {
  if (!state)
    return null

  const { nowPlaying } = state.app
  const genre = state.genres.find(g => g.id === nowPlaying.genre)
  const trackNo = nowPlaying.trackNo

  if (genre == null)
    return null

  return genre.tracklist[trackNo]
}

const mapStateToProps = (state: RootState) => {
  return {
    duration: state?.player.duration ?? 1,
    volume: state?.player.volume ?? 100,
    track: getCurrentTrack(state)
  }
}

const actionCreators = {
  onPlayClick: play,
  onPauseClick: pause,
  onVolumeChange: volume
}

type StateProps = ReturnType<typeof mapStateToProps>
type DispatchProps = typeof actionCreators

export default connect(mapStateToProps, actionCreators)(PlayerControlsContainer)