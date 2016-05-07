import React, { Component, PropTypes } from 'react'
import VideoPlayer from '../components/VideoPlayer'
import TopBar from '../components/TopBar'
import PlayerControls from '../components/PlayerControls'
import MapLayer from '../components/MapLayer'
import GenreInfo from './GenreInfo'

export default class App extends Component {
  render() {
    return (
      <div>
        <TopBar />

        <div className="map-container">
          <VideoPlayer />
          <GenreInfo />
          <PlayerControls />
          <MapLayer tileSources="/tiles/map.xml" startCenter={[1023, 807]} />
        </div>
      </div>
    )
  }
}