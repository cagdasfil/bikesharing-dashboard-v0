import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "../pages/Login";
import Transition from "../pages/Transition";
import Analytics from "../pages/Analytics";
import Database from "../pages/Database";


export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/transition" component={Transition} />
      <Route path="/database" component={Database} />
      <Route path="/analytics" component={Analytics} />
      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      <Route component={Login} />
    </Switch>
  );
}
