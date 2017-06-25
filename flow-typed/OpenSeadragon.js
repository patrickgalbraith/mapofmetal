declare module 'openseadragon' {

  declare type Options = {
    id?: string,
    element?: HTMLElement,
    tileSources?: any,
    tabIndex?: number,
    overlays?: Array<*>,
    xmlPath?: string,
    prefixUrl?: string,
    navImages?: NavImages,
    debugMode?: boolean,
    debugGridColor?: string,
    blendTime?: number,
    alwaysBlend?: boolean,
    autoHideControls?: boolean,
    immediateRender?: boolean,
    defaultZoomLevel?: number,
    opacity?: number,
    compositeOperation?: string,
    placeholderFillStyle?: any,
    degrees?: number,
    minZoomLevel?: number,
    maxZoomLevel?: number,
    homeFillsViewer?: boolean,
    panHorizontal?: boolean,
    panVertical?: boolean,
    constrainDuringPan?: boolean,
    wrapHorizontal?: boolean,
    wrapVertical?: boolean,
    minZoomImageRatio?: number,
    maxZoomPixelRatio?: number,
    smoothTileEdgesMinZoom?: number,
    iOSDevice?: boolean,
    autoResize?: boolean,
    preserveImageSizeOnResize?: boolean,
    minScrollDeltaTime?: number,
    pixelsPerWheelLine?: number,
    visibilityRatio?: number,
    viewportMargins?: any,
    imageLoaderLimit?: number,
    clickTimeThreshold?: number,
    clickDistThreshold?: number,
    dblClickTimeThreshold?: number,
    dblClickDistThreshold?: number,
    springStiffness?: number,
    animationTime?: number,
    gestureSettingsMouse?: GestureSettings,
    gestureSettingsTouch?: GestureSettings,
    gestureSettingsPen?: GestureSettings,
    gestureSettingsUnknown?: GestureSettings,
    zoomPerClick?: number,
    zoomPerScroll?: number,
    zoomPerSecond?: number,
    showNavigator?: boolean,
    navigatorId?: string,
    navigatorPosition?: string,
    navigatorSizeRatio?: number,
    navigatorMaintainSizeRatio?: boolean,
    navigatorTop?: number | string,
    navigatorLeft?: number | string,
    navigatorHeight?: number | string,
    navigatorWidth?: number | string,
    navigatorAutoResize?: boolean,
    navigatorAutoFade?: boolean,
    navigatorRotate?: boolean,
    controlsFadeDelay?: number,
    controlsFadeLength?: number,
    maxImageCacheCount?: number,
    timeout?: number,
    useCanvas?: boolean,
    minPixelRatio?: number,
    mouseNavEnabled?: boolean,
    showNavigationControl?: boolean,
    navigationControlAnchor?: ControlAnchor,
    showZoomControl?: boolean,
    showHomeControl?: boolean,
    showFullPageControl?: boolean,
    showRotationControl?: boolean,
    showSequenceControl?: boolean,
    sequenceControlAnchor?: ControlAnchor,
    navPrevNextWrap?: boolean,
    zoomInButton?: string,
    zoomOutButton?: string,
    homeButton?: string,
    fullPageButton?: string,
    rotateLeftButton?: string,
    rotateRightButton?: string,
    previousButton?: string,
    nextButton?: string,
    sequenceMode?: boolean,
    initialPage?: number,
    preserveViewport?: boolean,
    preserveOverlays?: boolean,
    showReferenceStrip?: boolean,
    referenceStripScroll?: string,
    referenceStripElement?: HTMLElement,
    referenceStripHeight?: number,
    referenceStripWidth?: number,
    referenceStripPosition?: string,
    referenceStripSizeRatio?: number,
    collectionMode?: boolean,
    collectionRows?: number,
    collectionColumns?: number,
    collectionLayout?: string,
    collectionTileSize?: number,
    collectionTileMargin?: number,
    crossOriginPolicy?: string | boolean,
    ajaxWithCredentials?: boolean,
  }

  declare type ButtonState = {
    REST: number,
    GROUP: number,
    HOVER: number,
    DOWN: number
  }

  declare type ViewPortMargins = {
    left: number,
    top: number,
    right: number,
    bottom: number
  }

  declare type BROWSERS = {
    UNKNOWN: number,
    IE: number,
    FIREFOX: number,
    SAFARI: number,
    CHROME: number,
    OPERA: number
  }

  declare type NavImagesItem = {
    REST: string,
    GROUP: string,
    HOVER: string,
    DOWN: string
  }

  declare type NavImages = {
    zoomIn: NavImagesItem,
    zoomOut: NavImagesItem,
    home: NavImagesItem,
    fullpage: NavImagesItem,
    rotateleft: NavImagesItem,
    rotateright: NavImagesItem,
    previous: NavImagesItem,
    next: NavImagesItem
  }

  declare type Placement = {
    CENTER: number,
    TOP_LEFT: number,
    TOP: number,
    TOP_RIGHT: number,
    RIGHT: number,
    BOTTOM_RIGHT: number,
    BOTTOM: number,
    BOTTOM_LEFT: number,
    LEFT: number
  }

  declare type ControlAnchor = {
    NONE: number,
    TOP_LEFT: number,
    TOP_RIGHT: number,
    BOTTOM_LEFT: number,
    BOTTOM_RIGHT: number,
    ABSOLUTE: number
  }

  declare type GestureSettings = {
    scrollToZoom:	boolean,
    clickToZoom: boolean,
    dblClickToZoom: boolean,
    pinchToZoom: boolean,
    flickEnabled: boolean,
    flickMinSpeed: number,
    flickMomentum: number
  }

  declare type EventListener = (event?: any) => void

  // CLASSES
  declare class Button extends EventSource {
    constructor(options: {
      element?: HTMLElement,
      tooltip?: string,
      srcRest?: string,
      srcGroup?: string,
      srcHover?: string,
      srcDown?: string,
      fadeDelay?: number,
      fadeLength?: number,
      onPress?: EventListener,
      onRelease?: EventListener,
      onClick?: EventListener,
      onEnter?: EventListener,
      onExit?: EventListener,
      onFocus?: EventListener,
      onBlur?: EventListener,
    }): Button;

    currentState: ButtonState;
    element: HTMLElement;
    fadeDelay: number;
    tracker: MouseTracker;

    disable(): void;
    enable(): void;
  }

  declare class ButtonGroup {
    constructor(options: {
      buttons: Button[],
      element?: HTMLElement
    }): ButtonGroup;

    buttons: Button[];
    element: HTMLElement;
    tracker: MouseTracker;
  }

  declare class Control {
    constructor(
      element: HTMLElement,
      options: {
        anchor?: ControlAnchor,
        attachToViewer?: boolean,
        autoFade?: boolean
      },
      container: HTMLElement
    ): Control;

    anchor: ControlAnchor;
    autoFade: boolean;
    container: HTMLElement;
    element: HTMLElement;
    wrapper: HTMLElement;

    destroy(): void;
    isVisible(): boolean;
    setOpacity(opacity: number): void;
    setVisible(visible: boolean): void;
  }

  declare class ControlDock {}

  declare class DisplayRect extends Rect {
    minLevel: number;
    maxLevel: number;

    constructor(x?: number, y?: number, width?: number, height?: number, minLevel?: number, maxLevel?: number): DisplayRect;
  }

  declare class Drawer {}

  declare class DziTileSource {}

  declare class EventSource {
    constructor(): EventSource;
    addHandler(eventName: string, handler: EventListener, userData?: any): void;
    addOnceHandler(eventName: string, handler: EventListener, userData?: any, times?: number): void;
    getHandler(eventName: string): EventListener;
    raiseEvent(eventName: string, eventArgs: any): void;
    removeAllHandlers(eventName: string): void;
    removeHandler(eventName: string, handler: EventListener): void;
  }

  declare class IIIFTileSource {}

  declare class ImageLoader {}

  declare class ImageTileSource {}

  declare class LegacyTileSource {}

  declare class MouseTracker {}

  declare class GesturePointList {}

  declare class Navigator {}

  declare class OsmTileSource {}

  declare class Overlay {}

  declare class Point {
    constructor(x: number, y: number): Point;
    apply(fn: (coord: number) => number): Point;
    clone(): Point;
    distanceTo(point: Point): number;
    divide(factor: number): Point;
    equals(point: Point): boolean;
    minus(point: Point): Point;
    negate(): Point;
    plus(point: Point): Point;
    rotate(degress, pivotopt): Point;
    times(factor: number): Point;
    toString(): string;
  }

  declare class Rect {
    height: number;
    width: number;
    x: number;
    y: number;

    constructor(x?: number, y?: number, width?: number, height?: number, degrees?: number): Rect;
    clone(): Rect;
    containsPoint(point: Point, epsilon?: number): boolean;
    equals(rectangle: Rect): boolean;
    getAspectRatio(): number;
    getBottomLeft(): Point;
    getBottomRight(): Point;
    getBoundingBox(): Rect;
    getCenter(): Point;
    getIntegerBoundingBox(): Rect;
    getSize(): Point;
    getTopLeft(): Point;
    getTopRight(): Point;
    intersection(rectangle: Rect): Rect;
    rotate(degress: number, pivot?: Point): Rect;
    times(factor: number): Rect;
    toString(): string;
    translate(delta: Point): Rect;
    union(rectangle: Rect): Rect;
  }

  declare class ReferenceStrip {}

  declare class Spring {}

  declare class Tile {}

  declare class TileCache {}

  declare class TiledImage {}

  declare class TileSource {}

  declare class TmsTileSource {}

  declare class Viewer {
    constructor(options: Options): Viewer;
    viewport: ViewPort;
    addHandler(event: string, handler: EventListener, userData?: any): void;
    destroy(): void;
  }

  declare class ViewPort {
    constructor(options: Options): ViewPort;
    applyConstraints(immediately?: boolean): void;
    deltaPixelsFromPoints(deltaPoints: Point, current?: boolean): Point;
    deltaPixelsFromPointsNoRotate(deltaPoints: Point, current?: boolean): Point;
    deltaPointsFromPixels(deltaPixels: Point, current?: boolean): Point;
    deltaPointsFromPixelsNoRotate(deltaPixels: Point, current?: boolean): Point;
    ensureVisible(immediately?: boolean): ViewPort;
    fitBounds(bounds: Rect, immediately?: boolean): ViewPort;
    fitBoundsWithConstraints(bounds: Rect, immediately?: boolean): ViewPort;
    fitHorizontally(immediately?: boolean): ViewPort;
    fitVertically(immediately?: boolean): ViewPort;
    getAspectRatio(): number;
    getBounds(current?: boolean): Rect;
    getBoundsNoRotate(current?: boolean): Rect;
    getBoundsNoRotateWithMargins(current?: boolean): Rect;
    getBoundsWithMargins(current?: boolean): Rect;
    getCenter(current?: boolean): Point;
    getContainerSize(): Point;
    getHomeBounds(): Rect;
    getHomeBoundsNoRotate(): Rect;
    getHomeZoom(): number;
    getMargins(): ViewPortMargins;
    getMaxZoom(): number;
    getMinZoom(): number;
    getRotation(): number;
    getZoom(current?: boolean): number;
    goHome(immediately?: boolean): ViewPort;
    imageToViewerElementCoordinates(pixel: Point): Point;
    imageToViewportCoordinates(imageX: Point | number, imageY?: number): Point;
    imageToViewportRectangle(imageX: Point | number, imageY?: number, pixelWidth?: number, pixelHeight?: number): Rect;
    imageToViewportZoom(imageZoom: number): number;
    imageToWindowCoordinates(pixel: Point): Point;
    panBy(delta: Point, immediately?: boolean): ViewPort;
    panTo(center: Point, immediately?: boolean): ViewPort;
    pixelFromPoint(point: Point, current?: boolean): Point;
    pixelFromPointNoRotate(point: Point, current?: boolean): Point;
    pointFromPixel(pixel: Point, current?: boolean): Point;
    pointFromPixelNoRotate(pixel: Point, current?: boolean): Point;
    resetContentSize(contentSize: Point): ViewPort;
    resize(newContainerSize: Point, maintain?: boolean): ViewPort;
    setMargins(margins: ViewPortMargins): void;
    setRotation(): ViewPort;
    update(): boolean;
    viewerElementToImageCoordinates(pixel: Point): Point;
    viewerElementToViewportCoordinates(pixel: Point): Point;
    viewerElementToViewportRectangle(rectangle: Rect): Rect;
    viewportToImageCoordinates(viewerX: Point | number, viewerY?: number): Point;
    viewportToImageRectangle(viewerX: Point | number, viewerY?: number, pointWidth?: number, pointHeight?: number): Rect;
    viewportToImageZoom(viewportZoom: number): number;
    viewportToViewerElementCoordinates(point: Point): Point;
    viewportToViewerElementRectangle(rectangle: Rect): Rect;
    viewportToWindowCoordinates(point: Point): Point;
    windowToImageCoordinates(pixel: Point): Point;
    windowToViewportCoordinates(pixel: Point): Point;
    zoomBy(factor: number, refPoint?: ?Point, immediately?: boolean): ViewPort;
    zoomTo(zoom: number, refPoint?: ?Point, immediately?: boolean): ViewPort;
  }

  declare class World {}

  // OpenSeadragon Object
  declare module.exports: {
    (options: Options): Viewer,

    // Classes
    Button: typeof Button,
    ButtonGroup: typeof ButtonGroup,
    Control: typeof Control,
    ControlDock: typeof ControlDock,
    DisplayRect: typeof DisplayRect,
    Drawer: typeof Drawer,
    DziTileSource: typeof DziTileSource,
    EventSource: typeof EventSource,
    IIIFTileSource: typeof IIIFTileSource,
    ImageLoader: typeof ImageLoader,
    ImageTileSource: typeof ImageTileSource,
    LegacyTileSource: typeof LegacyTileSource,
    MouseTracker: typeof MouseTracker,
    GesturePointList: typeof GesturePointList,
    Navigator: typeof Navigator,
    OsmTileSource: typeof OsmTileSource,
    Overlay: typeof Overlay,
    Point: typeof Point,
    Rect: typeof Rect,
    ReferenceStrip: typeof ReferenceStrip,
    Spring: typeof Spring,
    Tile: typeof Tile,
    TileCache: typeof TileCache,
    TiledImage: typeof TiledImage,
    TileSource: typeof TileSource,
    TmsTileSource: typeof TmsTileSource,
    Viewer: typeof Viewer,
    Viewport: typeof Viewport,
    World: typeof World,

    // Members
    Browser: {
      vendor: BROWSERS,
      version: number,
      alpha: boolean
    },
    BROWSERS: BROWSERS,
    ButtonState: ButtonState,
    ControlAnchor: ControlAnchor,
    DEFAULT_SETTINGS: any,
    fullScreenApi: {
      supportsFullScreen: boolean,
      isFullScreen: () => boolean,
      getFullScreenElement: () => HTMLElement,
      requestFullScreen: () => void,
      exitFullScreen: () => void,
      cancelFullScreen: () => void,
      fullScreenEventName: string,
      fullScreenErrorEventName: string
    },
    +OverlayPlacement: Placement,
    +OverlayRotationMode: {
      NO_ROTATION: number,
      EXACT: number,
      BOUNDING_BOX: number
    },
    pixelDensityRatio: number,
    +Placement: Placement,
    supportsCanvas: boolean,
    version: {
      versionStr: string,
      major: number,
      minor: number,
      revision: number
    },

    // Methods
    addClass: (element: HTMLElement, className: string) => void,
    addEvent: (element: HTMLElement, eventName: string, handler: EventListener, useCapture?: boolean) => void,
    cancelEvent: (event?: Event) => void,
    capitalizeFirstLetter: (str: string) => void,
    createCallback: (obj: Object, method: Function, args?: Array<*>) => typeof Function,
    delegate: (obj: Object, method: Function) => typeof Function,
    extend: typeof Function,
    getCssPropertyWithVendorPrefix: (property: string) => string,
    getElement: (element: HTMLElement) => HTMLElement,
    getElementOffset: (element: HTMLElement) => Point,
    getElementPosition: (element: HTMLElement) => Point,
    getElementSize: (element: HTMLElement) => Point,
    getElementStyle: (element: HTMLElement) => CSSStyleDeclaration,
    getMousePosition: (event?: Event) => Point,
    getPageScroll: () => Point,
    getString: (property: string) => string,
    getUrlParameter: (key: string) => string,
    getWindowSize: () => Point,
    imageFormatSupported: (extension?: string) => boolean,
    indexOf: (array: Array<*>, searchElement: *, fromIndex?: number) => number,
    isArray: (obj: any) => boolean,
    isEmptyObject: (obj: any) => boolean,
    isFunction: (obj: any) => boolean,
    isPlainObject: (obj: any) => boolean,
    isWindow: (obj: any) => boolean,
    jsonp: (options: any) => void,
    makeAjaxRequest: (options: any, onSuccess?: Function, onError?: Function) => void,
    makeCenteredNode: (element: HTMLElement) => HTMLElement,
    makeNeutralElement: (tagName: string) => HTMLElement,
    makeTransparentImage: (src: string) => HTMLElement,
    now: () => number,
    parseJSON: (string: string) => Object,
    parseXml: (string: string) => Document,
    pointInElement: (element: HTMLElement, point: Point) => boolean,
    removeClass: (element: HTMLElement, className: string) => void,
    removeEvent: (element: HTMLElement, eventName: string, handler: Function, useCapture?: boolean) => void,
    setElementOpacity: (element: HTMLElement, opacity: number, usesAlpha?: boolean) => void,
    setElementTouchActionNone: (element: HTMLElement | string) => void,
    setPageScroll: (scroll?: Point) => Point,
    setString: (property: string, value: any) => void,
    stopEvent: (event?: any) => void,
    type: (obj: any) => string
  };
}