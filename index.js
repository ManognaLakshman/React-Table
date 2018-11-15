import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import Department from "./Department";
import App from "./App";
//import EmpList from "EmpList";
//import { BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
// ReactDOM.render(
//   <BrowserRouter>
//     <Department />
//   </BrowserRouter>,
//   document.getElementById("root")
// );

//ReactDOM.render(<Department />, document.getElementById("root"));
// ReactDOM.render(
//   <Router history={browserHistory}>
//     <Route path="/" component={Department}>
//       <IndexRoute component={Department} />
//       <Route path="Department" component={Department} />
//     </Route>
//   </Router>,
//   document.getElementById("Department")
// );
ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
