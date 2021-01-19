

// https://gist.github.com/simonewebdesign/6183356
export function toggleFullScreen(): void {
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
    const docEL: HTMLElement | null = document.documentElement;

    if (docEL == null) {
      return;
    }

    if (typeof docEL.requestFullscreen === 'function') {
      docEL.requestFullscreen();
    } else if (typeof docEL.mozRequestFullScreen === 'function') {
      docEL.mozRequestFullScreen();
    } else if (typeof docEL.webkitRequestFullscreen === 'function') {
      docEL.webkitRequestFullscreen();
    }
  } else {
    if (typeof document.cancelFullScreen === 'function') {
      document.cancelFullScreen();
    } else if (typeof document.mozCancelFullScreen === 'function') {
      document.mozCancelFullScreen();
    } else if (typeof document.webkitCancelFullScreen === 'function') {
      document.webkitCancelFullScreen();
    }
  }
}

export function padLeft(string: string, pad: string, length: number): string {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export function formatSeconds(time: number): string {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  return padLeft(mins.toString(), '0', 2) + ':' + padLeft(secs.toString(), '0', 2);
}

// Gets mouse position relative to target element rather than window
// http://stackoverflow.com/a/16156057/1059001
export function relativeMousePosition(e: MouseEvent | null | undefined): {x: number;y: number;} {
  let m_posx: number = 0,
      m_posy: number = 0,
      e_posx: number = 0,
      e_posy: number = 0,
      obj = e ? e.target : window.event.target;

  // get mouse position on document crossbrowser
  if (!e) {
    e = window.event;
  }

  if (e.pageX || e.pageY) {
    m_posx = e.pageX;
    m_posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    m_posx = e.clientX + (document.body ? document.body.scrollLeft : 0) + (document.documentElement ? document.documentElement.scrollLeft : 0);
    m_posy = e.clientY + (document.body ? document.body.scrollTop : 0) + (document.documentElement ? document.documentElement.scrollTop : 0);
  }

  // get parent element position in document
  if (obj instanceof HTMLElement && obj.offsetParent) {
    do {
      if (obj instanceof HTMLElement) {
        e_posx += obj.offsetLeft;
        e_posy += obj.offsetTop;
      }
    } while (obj = obj.offsetParent);
  }

  // mouse position minus elm position is mouseposition relative to element:
  return {
    x: m_posx - e_posx,
    y: m_posy - e_posy
  };
}