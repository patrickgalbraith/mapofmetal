import React, { Component, PropTypes } from 'react'

export default class Settings extends Component {
  render() {
    return (
      <div className='ModalWrapper'>
        <div className='SettingsModal'>
          <p className='SettingsModal-title'>Settings</p>

          <ul className='SettingsModal-settings'>
            <li>
              <div className='SettingsModal-settings-title'>stream quality</div>
              <div className='SettingsModal-settings-value'>medium</div>
              <div className='SettingsModal-settings-description'>
                change the quality of the youtube stream, choose from 'low' where each video is approx 3mb, 'medium' around 6mb, 'high' around 20mb, etc... please note quality won't chnage until next track loads
              </div>
            </li>
          </ul>

          <div className='SettingsModal-footer'>
            <button className='SettingsModal-close'>ok</button>
          </div>
        </div>
      </div>
    )
  }
}