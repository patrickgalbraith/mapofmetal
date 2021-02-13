import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "whatwg-fetch";

import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

// Add css class for environment to enable development styles
if (document.body && process.env.NODE_ENV) {
  document.body.classList.add(`env-${process.env.NODE_ENV}`);
}

const initialState = {};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>,
  document.getElementById("react-root")
);

reportWebVitals(console.log);
