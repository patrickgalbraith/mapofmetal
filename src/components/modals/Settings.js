import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { PLAYER_QUALITY } from '../../constants'

import { qualityChange } from '../../actions/Player'

class Settings extends Component {
  getNextQuality(quality) {
    const iterator = PLAYER_QUALITY.entries()
    let nextQuality = null

    do {
      nextQuality = iterator.next()
    } while(!nextQuality.done && nextQuality.value[0] !== quality)

    if (nextQuality.done)
      return PLAYER_QUALITY.get('default') // return first item

    return iterator.next().value[0]
  }

  toggleStreamQuality() {
    const nextQuality = this.getNextQuality(this.props.quality)
    this.props.qualityChange(PLAYER_QUALITY.get(nextQuality))
  }

  render() {
    const { close, quality } = this.props

    return (
      <div className='ModalWrapper'>
        <div className='Modal SettingsModal'>
          <p className='Modal-title'>Settings</p>

          <ul className='Modal-settings'>
            <li>
              <div className='Modal-settings-title'>stream quality</div>
              <div className='Modal-settings-value'
                   onClick={() => this.toggleStreamQuality()}>
                { quality }
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
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    quality: state.player.quality
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    qualityChange: (q) => dispatch(qualityChange(q))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)