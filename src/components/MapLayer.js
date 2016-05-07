import React, { Component, PropTypes } from 'react'

export default class MapLayer extends Component {
  render() {
    return <div />;
  }

  componentDidMount() {
    this.viewerElement = document.createElement("div")
    this.viewerElement.className = 'map-layer'
    document.body.appendChild(this.viewerElement)

    this.viewer = OpenSeadragon({
      element:               this.viewerElement,
      tileSources:           this.props.tileSources,
      showNavigationControl: false,
      immediateRender:       window.matchMedia("(max-width: 768px)").matches,

      showNavigator:         false,
      navigatorWidth:        "160px",
      navigatorHeight:       "145px",

      visibilityRatio:       1.0,
      constrainDuringPan:    true,
      minZoomLevel:          1,
      defaultZoomLevel:      2.2,
      zoomPerClick:          1.0, // disabled
      zoomPerScroll:         1.4,

      overlays:              this.props.overlays
    })

    this.viewer.addHandler('open', (e) => {
      // Center point based roughly on position of 'Heavy Metal' genre
      const startCenter = this.viewer.viewport.imageToViewportCoordinates(
        new OpenSeadragon.Point(this.props.startCenter[0], this.props.startCenter[1])
      )

      this.viewer.viewport.panTo(startCenter, true)
      this.viewer.viewport.applyConstraints(true)
    })
  }

  componentWillUnmount() {
    this.viewer.destroy()
    document.body.removeChild(this.viewerElement)
  }
}