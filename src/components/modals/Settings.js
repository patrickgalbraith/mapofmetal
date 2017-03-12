import React, { Component, PropTypes } from 'react'

export default class Settings extends Component {
  render() {
    const { close } = this.props

    return (
      <div className='ModalWrapper'>
        <div className='Modal SettingsModal'>
          <p className='Modal-title'>Settings</p>

          <ul className='Modal-settings'>
            <li>
              <div className='Modal-settings-title'>stream quality</div>
              <div className='Modal-settings-value'>medium</div>
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