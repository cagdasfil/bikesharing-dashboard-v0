import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Map from "../pages/Map";
import PageNotFound from "../pages/PageNotFound";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/map" component={Map} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/" component={PageNotFound} />
    </Switch>
  );
}
