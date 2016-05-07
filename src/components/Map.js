import $ from 'jquery';

function initializeMap() {
  var viewer = OpenSeadragon({
    id: 'map',
    tileSources: "/tiles/map.xml",
    showNavigationControl: false,

    showNavigator: false,
    navigatorWidth: "160px",
    navigatorHeight: "145px",

    visibilityRatio: 1.0,
    constrainDuringPan: true,
    minZoomLevel:   1,
    defaultZoomLevel: 2.2,

    overlays: window.overlayData
  });

  viewer.addHandler('open', function(e) {
    // Center point based on position of 'Heavy Metal' genre
    var startCenter = viewer.viewport.imageToViewportCoordinates(new OpenSeadragon.Point(1023, 807));

    viewer.viewport.panTo(startCenter, true);
    viewer.viewport.applyConstraints(true);
  });
}

$( document ).ready(function() {
  $.getJSON( "data/genre-overlays.json", (data) => {
    window.overlayData = data;
    initializeMap();
  });
});