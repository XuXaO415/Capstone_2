import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// const root = ReactDOM.createRoot(document.getElementById("root"));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
//https://stackoverflow.com/questions/71913692/module-not-found-error-cant-resolve-react-dom-client
//https://www.linkedin.com/pulse/how-upgrade-react-17-webpack-5-step-rany-elhousieny-phd%E1%B4%AC%E1%B4%AE%E1%B4%B0/
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
