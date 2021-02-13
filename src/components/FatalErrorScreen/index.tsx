export default function FatalError() {
  return (
    <div className="FatalErrorScreen">
      <img
        className="FatalErrorScreen-image"
        src="/static/img/error-image.svg"
        alt="Error"
      />
      <p className="FatalErrorScreen-message">Oops something broke!</p>
      <p className="FatalErrorScreen-retry">
        <button onClick={() => window.location.reload()}>RETRY</button>
      </p>
      <p className="FatalErrorScreen-attribution">
        Graphic by{" "}
        <a
          title="Flaticon"
          href="http://www.flaticon.com"
          rel="nofollow noopener external"
        >
          www.flaticon.com
        </a>
      </p>
    </div>
  );
}
