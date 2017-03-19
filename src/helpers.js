// https://gist.github.com/simonewebdesign/6183356
export function toggleFullScreen() {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen()
    }
  }
}

export function padLeft(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length)
}

export function formatSeconds(time) {
  const mins = Math.floor(time / 60)
  const secs = time % 60
  return padLeft(mins, '0', 2) + ':' + padLeft(secs, '0', 2)
}

// Gets mouse position relative to target element rather than window
// http://stackoverflow.com/a/16156057/1059001
export function relativeMousePosition(e){
  var m_posx = 0, m_posy = 0, e_posx = 0, e_posy = 0,
         obj = e.target;

  // get mouse position on document crossbrowser
  if (!e){e = window.event;}
  if (e.pageX || e.pageY){
      m_posx = e.pageX;
      m_posy = e.pageY;
  } else if (e.clientX || e.clientY){
      m_posx = e.clientX + document.body.scrollLeft
               + document.documentElement.scrollLeft;
      m_posy = e.clientY + document.body.scrollTop
               + document.documentElement.scrollTop;
  }

  // get parent element position in document
  if (obj.offsetParent){
      do {
          e_posx += obj.offsetLeft;
          e_posy += obj.offsetTop;
      } while (obj = obj.offsetParent);
  }

  // mouse position minus elm position is mouseposition relative to element:
  return {
    x: m_posx - e_posx,
    y: m_posy - e_posy
  }
}