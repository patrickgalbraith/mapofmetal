import React from "react"
import { Component } from "react"
import { RootState } from "../../reducers"
import { connect } from "react-redux"
import { PLAYER_QUALITY } from "../../constants"
import { qualityChange } from "../../actions/Player"

type Quality = string

type Props = {
  quality?: Quality | null
  close: () => unknown
  qualityChange: (quality: Quality) => void
}

class Settings extends Component<Props> {
  getNextQuality(quality: Quality): Quality {
    const iterator = PLAYER_QUALITY.entries()
    let nextQuality = null

    do {
      nextQuality = iterator.next()
    } while (!nextQuality.done && nextQuality.value[0] !== quality)

    if (nextQuality.done)
      return PLAYER_QUALITY.get('default')! // return first item

    nextQuality = iterator.next()

    if (nextQuality.value == null)
      return PLAYER_QUALITY.get('default')! // return first item

    return nextQuality.value[0]
  }

  toggleStreamQuality() {
    const nextQuality = this.getNextQuality(this.props.quality ?? 'default')
    const quality = PLAYER_QUALITY.get(nextQuality ?? 'default')

    if (quality == null)
      return

    this.props.qualityChange(quality)
  }

  render() {
    const { close, quality } = this.props

    return <div className='ModalWrapper'>
        <div className='Modal SettingsModal'>
          <p className='Modal-title'>Settings</p>

          <ul className='Modal-settings'>
            <li>
              <div className='Modal-settings-title'>stream quality</div>
              <div className='Modal-settings-value' onClick={() => this.toggleStreamQuality()}>
                {quality}
              </div>
              <div className='Modal-settings-description'>
                change the quality of the youtube stream, choose from 'low' where each video is approx 3mb,
                'medium' around 6mb, 'high' around 20mb, etc... please note quality won't chnage until next track loads
              </div>
            </li>
          </ul>

          <div className='Modal-footer'>
            <button className='Modal-close' onClick={close}>ok</button>
          </div>
        </div>
      </div>
  }
}

const mapStateToProps = (state: RootState, _ownProps: Props): {
  quality?: Quality | null
} => {
  return {
    quality: state.player.quality
  }
}

const actionCreators = {
  qualityChange
}

export default connect(mapStateToProps, actionCreators)(Settings)