import { MapCenterPoint } from "../types"
import React, { Component } from "react"
import { toggleFullScreen } from "../helpers"
import { POSTER_LINK } from "../constants"

type Props = {
  changeMapCenter: (center: MapCenterPoint) => void
  openModal: (key: string) => void
}

export default class TopBar extends Component {

  props: Props

  openUrl(url: string) {
    window.open(url)
  }

  render() {
    const {
      changeMapCenter,
      openModal
    } = this.props

    const menuItems = [{
      title: 'legend',
      onClick: () => changeMapCenter(['right', 'top'])
    }, {
      title: 'share/follow',
      onClick: () => openModal('Share')
    }, {
      title: 'fullscreen',
      onClick: toggleFullScreen
    }, {
      title: 'settings',
      onClick: () => openModal('Settings')
    }, {
      title: 'buy poster',
      onClick: () => this.openUrl(POSTER_LINK)
    }, {
      title: 'about',
      onClick: () => openModal('About')
    }]

    return <ul className='TopBar'>
        {menuItems.map((item, idx) => <li key={idx} className='TopBar-item'><button onClick={item.onClick}>{item.title}</button></li>)}
      </ul>
  }
}