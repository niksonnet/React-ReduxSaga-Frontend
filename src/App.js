import { Switch, Route } from "react-router-dom"

import './App.css';
import Login from "./Components/Login/Login";
import Estimation from "./Components/Estimation/Estimation";
import { Fragment } from "react";
import { PrivateRoute } from "./Components/PrivateRoute.jsx"

function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/estimation" component={Estimation} />
        <PrivateRoute exact path="/estimation-auth" component={Estimation} />
      </Switch>
    </Fragment>
  );
}

export default App;
