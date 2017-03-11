import React, { Component, PropTypes } from 'react'
import { toggleFullScreen } from '../helpers'
import { POSTER_LINK } from '../constants'

export default class TopBar extends Component {
  openUrl(url) {
    window.open(url)
  }

  render() {
    const menuItems = [
      {
        title: 'legend',
        onClick: () => {}
      },
      {
        title: 'share/follow',
        onClick: () => {}
      },
      {
        title: 'fullscreen',
        onClick: toggleFullScreen
      },
      {
        title: 'settings',
        onClick: () => {}
      },
      {
        title: 'buy poster',
        onClick: () => { this.openUrl(POSTER_LINK) }
      },
      {
        title: 'about',
        onClick: () => {}
      }
    ]

    return (
      <ul className='TopBar'>
        { menuItems.map((item, idx) => (
          <li key={idx} className='TopBar-item'><button onClick={item.onClick}>{ item.title }</button></li>
        ))}
      </ul>
    )
  }
}