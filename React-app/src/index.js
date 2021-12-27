import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
// provider makes the redux store available to connect calls . access state anywhere
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Thunks are the standard approach for writing async logic in Redux apps, and are commonly used for data fetching.
import reducers from "./reducers";
import './index.css'
const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
