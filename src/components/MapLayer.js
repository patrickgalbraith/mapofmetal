import React, { Component, PropTypes } from 'react'
import OpenSeadragon from 'openseadragon'

const IMAGE_WIDTH  = 4961
const IMAGE_HEIGHT = 3508

class MapLayer extends Component {
  render() {
    return <div className='MapLayerPlaceholder' />
  }

  parsePosition(position) {
    if (position[0] === 'left')
      position[0] = 0
    else if(position[0] === 'right')
      position[0] = IMAGE_WIDTH

    if (position[1] === 'top')
      position[1] = 0
    else if (position[1] === 'bottom')
      position[1] = IMAGE_HEIGHT

    return position
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(nextProps) {
    const { centerPosition } = nextProps

    if (centerPosition && this.props.centerPosition !== centerPosition) {
      const pos = this.parsePosition(centerPosition)

      const centerCoord = this.viewer.viewport.imageToViewportCoordinates(
        new OpenSeadragon.Point(pos[0], pos[1])
      )

      this.viewer.viewport.panTo(centerCoord, false)
                          .applyConstraints(false)
    }
  }

  componentDidMount() {
    const {
      overlays,
      tileSources,
      centerPosition,
      onDragStart,
      onDragEnd,
      onOverlayClick
    } = this.props

    this.viewerElement = document.createElement('div')
    this.viewerElement.className = 'MapLayer'

    document.body.appendChild(this.viewerElement)

    let buttonsElement = document.createElement('div')
    buttonsElement.className = 'MapLayer-buttons'

    // Add overlay buttons to dom. This is important because Openseadragon creates
    // anchor <a> elements by default which causes most desktop browsers to display
    // a anchor tooltip at the bottom left of the screen
    overlays.forEach((overlay) => {
      let button = document.createElement('button')

      button.id        = overlay.id
      button.className = overlay.className

      buttonsElement.appendChild(button)
    })

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
      let zoomLevel = (IMAGE_WIDTH / window.innerWidth)
      let startCenter = centerPosition || [1023-62, 750]

      // Adjust center and zoom on mobile
      if (window.matchMedia('(max-width: 1024px)').matches) {
        zoomLevel = zoomLevel * 0.7 // Zoom out a bit so text fits in
        startCenter = [960, 790]
      }

      startCenter = this.parsePosition(startCenter)

      const startCenterCoord = this.viewer.viewport.imageToViewportCoordinates(
        new OpenSeadragon.Point(startCenter[0], startCenter[1])
      )

      this.viewer.viewport.panTo(startCenterCoord, true)
                          .zoomTo(zoomLevel, null, true)
                          .applyConstraints(true)

      // For initial fade in
      setTimeout(() => {
        this.viewerElement.classList.add('active')
      }, 2000)
    })

    this.viewer.addHandler('animation-start', (e) => {
      if(!this.dragging) {
        this.dragging = true
        onDragStart()
      }
    })

    this.viewer.addHandler('animation-finish', (e) => {
      if(this.dragging) {
        this.dragging = false
        onDragEnd()
      }
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
  tileSources:    PropTypes.string.isRequired,
  overlays:       PropTypes.array.isRequired,
  centerPosition: PropTypes.array,
  onOverlayClick: PropTypes.func.isRequired,
  onDragStart:    PropTypes.func.isRequired,
  onDragEnd:      PropTypes.func.isRequired
}

export default MapLayer