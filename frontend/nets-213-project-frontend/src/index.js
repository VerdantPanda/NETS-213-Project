import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import UserView from "./components/UserView";
import TurkerView from "./components/TurkerView";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
const routing = (
  <Router>
    <div>
      <h1>Website Name</h1>
      <Route path="/" component={App} />
      <Route path="/user" component={UserView} />
      <Route path="/mturk/:id" component={TurkerView} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
