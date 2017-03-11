require("style-loader!raw-loader!../static/dist/main.css")

if (module.hot) {
  module.hot.accept()

  document.querySelectorAll('link[href][rel=stylesheet]').forEach((link) => {
    const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`)
    link.href = nextStyleHref
  })
}