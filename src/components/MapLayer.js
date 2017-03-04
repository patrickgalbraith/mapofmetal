import React, { Component, PropTypes } from 'react'
import OpenSeadragon from 'openseadragon'

class MapLayer extends Component {
  render() {
    return <div className='MapLayerPlaceholder' />
  }

  componentDidMount() {
    const fullImageWidth = 4961
    const { onOverlayClick, tileSources, overlays } = this.props

    this.viewerElement = document.createElement('div')
    this.viewerElement.className = 'MapLayer'

    document.body.appendChild(this.viewerElement)

    // Note needs this patch https://github.com/openseadragon/openseadragon/pull/1133
    this.viewer = OpenSeadragon({
      element:               this.viewerElement,
      tileSources:           tileSources,
      showNavigationControl: false,
      immediateRender:       window.matchMedia('(max-width: 768px)').matches,

      showNavigator:         false,

      homeFillsViewer:       false,
      visibilityRatio:       1.0,
      constrainDuringPan:    true,
      minZoomLevel:          1,
      zoomPerClick:          1.0, // disabled
      zoomPerScroll:         1.4,
      springStiffness:       6.5,

      preserveImageSizeOnResize: true,

      overlays:              overlays
    })

    this.viewer.addHandler('open', (e) => {
      let zoomLevel = (fullImageWidth / window.innerWidth)
      let startCenter = [1023-62, 750]

      // Adjust center and zoom on mobile
      if (window.matchMedia('(max-width: 1024px)').matches) {
        zoomLevel = zoomLevel * 0.7 // Zoom out a bit so text fits in
        startCenter = [960, 790]
      }

      const startCenterCoord = this.viewer.viewport.imageToViewportCoordinates(
        new OpenSeadragon.Point(startCenter[0], startCenter[1])
      )

      this.viewer.viewport.panTo(startCenterCoord, true)
      this.viewer.viewport.zoomTo(zoomLevel, null, true)
      this.viewer.viewport.applyConstraints(true)

      setTimeout(() => {
        this.viewer.viewport
      }, 1000)
    })

    // Handle click events on genre overlays
    const convertOverlayIdToGenreId = (overlayId) => overlayId.replace('map-overlay__', '')

    document.body.addEventListener('click', (el) => {
      if (el.target.classList.contains('map-genre-overlay')) {
        onOverlayClick(convertOverlayIdToGenreId(el.target.id), el.target.id)
      }
    })
  }

  componentWillUnmount() {
    this.viewer.destroy()
    document.body.removeChild(this.viewerElement)
  }
}

MapLayer.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  tileSources: PropTypes.string.isRequired,
  overlays: PropTypes.array.isRequired
}

export default MapLayer