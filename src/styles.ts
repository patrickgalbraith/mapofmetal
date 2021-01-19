require("style-loader!raw-loader!../static/dist/main.css");

if (module.hot) {
  module.hot.accept();

  // Note: need to convert NodeList to array
  const linkTags = [].slice.call(document.querySelectorAll('link[href][rel=stylesheet]'));

  linkTags.forEach(link => {
    const nextStyleHref = link.href.replace(/(\?\d+)?$/, `?${Date.now()}`);
    link.href = nextStyleHref;
  });
}