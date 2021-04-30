import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./logo_nets.svg";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import UserView from "./components/UserView";
import TurkerView from "./components/TurkerView";
import RedirectView from "./components/RedirectView";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
document.title = "Second Opinion";
const routing = (
  <Router>
    <div>
      <Link to="/" about="Home">
        <img
          src={logo}
          alt="second_opinion_logo"
          style={{
            height: "auto",
            maxWidth: "30%",
          }}
          draggable="false"
        />
      </Link>

      <Switch>
        <Route path="/mturk/:id" component={TurkerView} />
        <Route path="/user" component={UserView} />
        <Route path="/" component={RedirectView} />
      </Switch>
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
