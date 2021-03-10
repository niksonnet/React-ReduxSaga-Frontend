import { BrowserRouter as Router } from "react-router-dom"
import { Switch, Route } from "react-router-dom"

import './App.css';
import Login from "./Components/Login/Login";
import Estimation from "./Components/Estimation/Estimation";
import { Fragment } from "react";

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" > <Login /></Route>
          <Route exact path="/login" > <Login /></Route>
          <Route exact path="/estimation" > <Estimation /></Route>
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
